---
title: Authentication in Next.js with an External Backend
description: How to securely authenticate a Next.js app with an external backend while keeping server-side rendering and security best practices intact.
published: '2025-03-01'
category: frontend
---

# Authentication in Next.js with an External Backend

Meta-frameworks like Next.js are a superset of other frameworks. They have an organized structure and provide various methods and tools that make development more efficient — making full-stack development easier in general.

If you are a front-end developer working in an environment where the back-end uses a different technology, you should (most of the time) go with a client SPA library or framework like React, Svelte, etc.

But what if you're working on a website that needs meta-framework features like SSG, ISR, or prerendering, and the back-end is already done with something like PHP? Or maybe a client comes to you with an API ready and wants a Next.js website for some reason.

Well, you would just call the external back-end APIs on the Next.js server instead of querying a database directly, and all features will work without a problem.

There will be a problem once the website needs authentication.

## The Problem

Authentication without meta-frameworks is fairly straightforward:

- You send your login request
- Receive a token
- Store it in state
- Send it in every request using axios interceptors or manually

And you're done.

In meta-frameworks, if you use the same approach you won't be able to fetch data on the server, because the token is only accessible to the client through your state. So your app will behave just like an SPA anyway.

You can set the token in cookies from the client and access it from the server. But it won't be an `httpOnly` cookie, since you're setting it from the client — making your website vulnerable to CSRF attacks.

So if you care about security, this approach won't be ideal.

Ultimately, we want to store the token in two places:

1. As an `httpOnly` cookie
2. In our app memory (state)

So we can access it from both client and server. This way we can fetch data from anywhere, stay secured, and keep the framework's features.

## The Solution

Since we want to set an `httpOnly` cookie in our app, based on [Next.js docs](https://nextjs.org/docs/app/api-reference/functions/cookies#setting-a-cookie), we have to make our login request go through an API route handler or a server action.

### 1. Create the Login API Route

```ts title="src/app/api/login/route.ts"
import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This route acts as a middleware between you and your backend server
export async function POST(request: Request) {
    const cookieStore = await cookies();
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());

    try {
        // login request to the original backend
        const res = await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const json = await res.json();

        if (res.ok) {
            cookieStore.set("token", json.data.token, {
                path: "/",
                expires: new Date(json.data.token_expires_at),
                // We can set the token as an httpOnly cookie
                // now because we are on the server
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production"
            });
            // Optional: if your backend implements refresh token
            cookieStore.set("refreshToken", json.data.refresh_token, {
                path: "/",
                expires: new Date(json.data.refresh_token_expires_at),
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production"
            });
        }

        // Return the same response as the external backend.
        return NextResponse.json(json, { status: res.status });
    } catch (err) {
        console.log("Error logging in:", err);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
```

### 2. Create the Login Form

```tsx title="src/app/login/page.tsx"
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    // zustand store. You can use Redux, Recoil, or any other
    // state management method.
    const loginInState = useAuthStore((state) => state.login);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setErrors({});
        setLoading(true);

        // request to the API route we just created
        await fetch("/api/login", {
            method: "POST",
            body: formData
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    if (data?.data) setErrors(data.data);
                    throw new Error(data?.message);
                }
                return data;
            })
            .then(({ data }) => {
                // If the login succeeds, store the user data and token in memory (state)
                loginInState(data.token, data.user);
                // then redirect the user to the home page
                router.push("/");
            })
            .catch((error) => {
                // if anything went wrong show a toast error
                toast.error(error?.message || "Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="********" />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    );
}
```

Now we have the token in both cookies and state, and it's secure too!

## Handling Page Refreshes and Protected Routes

The next step is to handle a couple of scenarios:

- When the user refreshes the page, the state is cleared — so we have to get the token and profile again from the server.
- Protecting routes based on login status.

### 3. Create the Profile API Route

```ts title="src/app/api/profile/route.ts"
import { API_URL } from "@/constants";
import { refreshToken } from "@/utils/refresh-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
        if (!cookieStore.get("refreshToken")?.value) {
            return NextResponse.json({ message: "No user logged in" }, { status: 200 });
        }
        // Optional: If you have a refresh token, get the new token and set it.
        const newTokenData = await refreshToken();
        if (!newTokenData) {
            cookieStore.delete("token");
            cookieStore.delete("refreshToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }

        token = newTokenData.token;
        cookieStore.set("token", newTokenData.token, {
            path: "/",
            expires: new Date(newTokenData.expires),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
    }

    try {
        // get the user profile from the external backend with the token
        const res = await fetch(API_URL + "/auth/profile", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const { data } = await res.json();
        // return the user and token to the client to set them in state
        return NextResponse.json({ user: data, token }, { status: res.status });
    } catch {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
```

### 4. Create an Auth Provider

```tsx title="src/providers/auth-provider.tsx"
"use client";
import { useEffect } from "react";
import { useAuthStore } from "./store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const loginInState = useAuthStore((state) => state.login);

    useEffect(() => {
        async function getUser() {
            const res = await fetch("/api/profile");
            const data = await res.json();
            if (data?.token && data?.user) {
                loginInState(data.token, data.user);
            }
        }
        getUser();
    }, [loginInState]);

    return children;
}
```

### 5. Wrap Your Layout with the Provider

```tsx title="src/app/layout.tsx"
import AuthProvider from "@/providers/auth-provider";
import "./globals.css";

interface Props {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
    return (
        <html>
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
```

### 6. Protect Routes with Middleware

```ts title="src/middleware.ts"
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PRIVATE_ROUTES = ["/dashboard", "/admin"];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("refreshToken")?.value;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    if (token && AUTH_ROUTES.some((path) => pathname.startsWith(path))) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (!token && PRIVATE_ROUTES.some((path) => pathname.startsWith(path))) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
```

And that's it!

This approach works with many other meta-frameworks, not just Next.js — there will just be some differences depending on the framework itself. When I first faced this problem I found no resources discussing it, so hopefully this saves you the same headache.

Thanks for reading, and I hope you face no bugs for the rest of the week!
