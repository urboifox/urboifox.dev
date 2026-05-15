---
title: Building a File Upload Component
description: A walkthrough of how to handle file uploads using React — covering custom styling, drag and drop, image previews, upload progress, and presigned URLs.
published: '2025-08-20'
category: frontend
---

# File uploads

As apps grow more media heavy, handling files in forms is no longer just a `<input type="file">`.
Users expect more. Previews, drag and drop, upload progress, instant previews, and more.
And as these UX features get more complex, it's your job to make sure it feels smooth for the user.

## Looks and Feels

Let's start with a simple example. then we'll add some features and improvements along the way.
You probably already know how to upload files from an html form:

```html title="index.html"
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <button type="submit">Upload</button>
</form>
```

The `enctype` attribute is important here, and it can have two values: `application/x-www-form-urlencoded` and `multipart/form-data`.
the first one is the default, and is used for simple forms, the browser will send the data as key-value pairs in the url.
And the second is designed for file uploads, as it tells the browser to break the form data into _multiple_ parts. including the file we want to upload.

When this form is submitted, a form data object with a `file` key will be sent to the `/upload` endpoint, and you can add some more lines of code to handle loading states, errors, etc.
Simple right? now let's try to enhance this a little bit.

### Previews

Selecting a file and only seeing it's name is not the best, ideally you wanna show a preview of the selected file before the user submits the form.
Thankfully, there's a simple way to do this with the `URL.createObjectURL` method.

```tsx title="file-upload-form.tsx"
import { useState, useEffect } from 'react';

export default function FileUploadForm() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const url = URL.createObjectURL(files[0]);
            setPreviewUrl(url);

            // remove the previous file from memory when file changes/unmounts
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [files]);

    return (
        <form action="/upload" method="post" encType="multipart/form-data">
            <input type="file" name="file" onChange={(e) => setFiles(e.target.files)} />
            <button type="submit">Upload</button>

            {previewUrl && <img src={previewUrl} alt="Preview" />}
        </form>
    );
}
```

Ideally, you should revoke the url using `URL.revokeObjectURL` when the component is destroyed, or when the user selects a different file to prevent memory leaks.

### Changing the input's identity

The look of the native file input is not very appealing, the next step is to change how the input looks.
But we need to make sure to keep the input's functionality the same. So when the user clicks our input, the browser will open the file picker.

And that's where the `<label>` tag comes in. It can be used in two ways:

- Add an id to an input, and use that id on the `for` attribute of the label.

```html title="index.html"
<label for="file">Choose a file</label> <input type="file" id="file" />
```

- Wrap the input with the label tag. And that's how we'll do it in this example.

```html title="index.html"
<label>
    Choose a file
    <input type="file" />
</label>
```

Now we can hide the input, and anything inside the label will trigger the file picker.

```html title="index.html"
<div>
    Drag and drop or
    <label>
        <input type="file" style="display: none" />
        choose a file
    </label>
</div>

<style>
    div {
        border: 1px solid dashed;
        border-radius: 1rem;
    }

    label:hover {
        text-decoration: underline;
    }
</style>
```

You get the idea, you can do whatever you want with how the input looks.

### Drag and drop

Now since we added a preview for the file, and created a custom UI for the input too, it's time to add drag and drop support.
We can do this by adding an `ondrop` event listener to our input:

```tsx title="file-upload-form.tsx"
export default function FileUploadForm() {
    const [files, setFiles] = useState<File[]>(null);

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files) {
            setFiles(Array.from(e.dataTransfer.files));
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    }

    // ...
    // rest of the preview related code
    // ...

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            Drag and drop or
            <label>
                <input type="file" style={{ display: 'none' }} onChange={handleChange} />
                choose a file
            </label>
        </div>
    );
}
```

Notice that we prevented the default behavior of the `onDragOver` event. By default when you drag a file over the browser window, the assumes you might want to open that file.
If you don't prevent `onDragOver`

- The `onDrop` event will not file. The browser will block it.
- Browser will open the file directly

Drag and drop is a very tricky thing to implement, there is a lot more you can enhance, and many edge cases to consider. But this is a good starting point.

## Uploading to A Server

Now that we gave the user the ability to drag and drop, and preview the file that he wants; we can start working on the hidden part for the user.

### Sending the file in form data

The most basic way to upload a file is to send it in the form data. This is the default behavior of the browser when there's a file input in a form.

```html title="index.html"
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <button type="submit">Upload</button>
</form>
```

Pretty simple, right? But not so flexible.
If you have a form where you edit the file, how can you get the `File` object again so that you can send it to the server?

It's a bit tricky, you would need to fetch the file, convert it to a `blob`, and then create a new `File` object with the blob.

Let's say the backend returns a response like this:

```json title="response.json"
{
    "file": "https://example.com/file.jpg"
}
```

You can then implement the form as following:

```tsx title="file-edit-form.tsx"
export default function FileEditForm() {
    const [files, setFiles] = useState<File[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    }

    useEffect(() => {
        fetch('/initial-data')
            .then((res) => res.json()) // { file: "https://example.com/file.jpg" }
            .then(async (json) => {
                const fileResponse = await fetch(json.file);
                const blob = await fileResponse.blob();
                const newFile = new File([blob], 'file.jpg');
                setFiles([newFile]);
            });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        files.forEach((f) => formData.append('file', f));

        await fetch('/upload', {
            method: 'POST',
            body: formData
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleChange} />
            <button type="submit">Upload</button>
        </form>
    );
}
```

Notice that the initial file wont exist in the form data if you submit the form natively, that's because you can't programatically inject a `File` object into an input.
So you would need to intercept the form submission, create a new `FormData` yourself, set the file inside it, and then submit the form.

And let's just say you won't do that. It's just one of the many ways I've seen people do it.
You might adjust things a bit with your backend, so that if you sent an empty key, it would mean that the user didn't select a different file. But that's also not flexible.

### Presigned URLs

The way you probably want to handle file uploads is by using presigned urls.
The steps are as following:

- User selects a file
- Client sends the file metadata to the server
- Server generates a presigned url and sends it back to the client
- Client uploads the file using the presigned url
- The presigned url endpoint returns a key to the file
- The client then sends that key to the server on form submission with other form data
- The server saves the key in the database

If you think about it, this is harder to grasp at first than other approaches, but it's actually very simple, easy to implement, and very flexible.

Let's say the backend returns a response like this:

```json title="response.json"
{
    "file": {
        "key": "1234567890",
        "url": "https://example.com/file.jpg",
        "mime": "image/jpeg",
        "name": "file.jpg"
    }
}
```

This would make things a lot easier, you can now just play with the `key` value based on what you agreed on with the backend.
Let's now make a file input component that can handle multiple files, and upload them to a presigned url.
A starting point would be something like this:

### File input component

```tsx title="file-input.tsx"
export interface FileItem {
    id: string;
    file: File;
    url?: string;
    progress: number;
    status: Status;
    error?: string;
    key?: string;
    xhr?: XMLHttpRequest | null;
    default?: boolean;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    multiple?: boolean;
}
export function FileInput({ name, multiple, ...rest }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [items, setItems] = useState<FileItem[]>([]);

    const openPicker = () => inputRef.current?.click();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const files = Array.from(e.currentTarget.files);
            const next = files.map((file) => ({
                id: crypto.randomUUID(),
                file,
                url: URL.createObjectURL(file),
                progress: 0,
                status: 'idle' as const
            }));
            setItems(next);
        }
    }

    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                multiple={multiple}
                style={{ display: 'none' }}
                {...rest}
            />

            <button type="button" onClick={openPicker}>
                Choose file
            </button>

            {items.map((item) => (
                <div key={item.id}>
                    {item.url && <img src={item.url} width={80} />}
                    <span>{item.file.name}</span>
                </div>
            ))}
        </div>
    );
}
```

Here we just hide the native input, let the user open the picker via a button, and show a preview.
At this point, it’s still “client-side only.”

### Handling uploads

Now that we have a file input, we can start handling the uploads.
The first thing we need to do is to add a `presign` function to the props.
This function will be responsible for generating a presigned url for the file.

Our props now look like this:

```tsx title="file-input.tsx"
interface PresignResult {
    url: string;
    method: string;
    headers?: Record<string, string>;
    fields?: Record<string, string>;
    key?: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    multiple?: boolean;
    presign: (file: File) => Promise<PresignResult>;
}
```

And we can add a simple `patch` function to help us update the specific item we are handling:

```tsx title="file-input.tsx"
function patch(id: string, data: Partial<FileItem>) {
    setItems((prev) => {
        return prev.map((item) => (item.id === id ? { ...item, ...data } : item));
    });
}
```

And another function to handle the uploading of a single file:

```tsx title="file-input.tsx"
async function uploadItem(item: FileItem) {
    const signed = await presign(item.file);
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            const percentage = Math.round((e.loaded / e.total) * 100);
            patch(item.id, { progress: percentage });
        }
    };

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            patch(item.id, { status: 'success', key: signed.key });
        } else {
            patch(item.id, { status: 'error', error: `(${xhr.status})` });
        }
    };

    xhr.open(signed.method, signed.url);
    xhr.send(item.file);
}
```

The whole component now looks like this:

```tsx title="file-input.tsx"
import React, { useRef, useState } from 'react';

interface PresignResult {
    url: string;
    method: string;
    headers?: Record<string, string>;
    fields?: Record<string, string>;
    key?: string;
}

interface FileItem {
    id: string;
    file: File;
    url?: string;
    progress: number;
    status: 'idle' | 'uploading' | 'success' | 'error';
    error?: string;
    key?: string;
    xhr?: XMLHttpRequest | null;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    multiple?: boolean;
    presign: (file: File) => Promise<PresignResult>;
}

export function FileInput({ name, multiple, presign, ...rest }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [items, setItems] = useState<FileItem[]>([]);

    const openPicker = () => inputRef.current?.click();

    function patch(id: string, data: Partial<FileItem>) {
        setItems((prev) => {
            return prev.map((item) => (item.id === id ? { ...item, ...data } : item));
        });
    }

    async function uploadItem(item: FileItem) {
        const signed = await presign(item.file);
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percentage = Math.round((e.loaded / e.total) * 100);
                patch(item.id, { progress: percentage });
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                patch(item.id, { status: 'success', key: signed.key });
            } else {
                patch(item.id, { status: 'error', error: `(${xhr.status})` });
            }
        };

        xhr.open(signed.method, signed.url);
        xhr.send(item.file);
    }

    function addFiles(fileList: FileList | File[]) {
        const array = Array.from(fileList);
        const newItems: FileItem[] = array.map((file) => ({
            id: crypto.randomUUID(),
            file,
            url: URL.createObjectURL(file),
            progress: 0,
            status: 'idle' as const
        }));

        setItems((prev) => {
            if (!multiple && prev.length) {
                prev.forEach((i) => i?.xhr?.abort());
                const next = [newItems[0]];
                return next;
            }

            const next = [...prev, ...newItems];
            return next;
        });
    }

    function removeItem(item: FileItem) {
        setItems((prev) => {
            const next = prev.filter((i) => i.id !== item.id);

            if (item.url?.startsWith('blob:')) URL.revokeObjectURL(item.url);
            if (item.xhr) item.xhr.abort();

            return next;
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            addFiles(e.currentTarget.files);
        }
    }

    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                multiple={multiple}
                style={{ display: 'none' }}
                {...rest}
            />

            <button type="button" onClick={openPicker}>
                Choose file
            </button>

            {items.map((item) => (
                <div key={item.id}>
                    {item.url &&
                        (item.mime.startsWith('image/') ? (
                            <img src={item.url} width={80} />
                        ) : (
                            <span>File</span>
                        ))}
                    <span>{item.file.name}</span>
                    {item.status === 'uploading' && <progress value={item.progress} max={100} />}
                </div>
            ))}
        </div>
    );
}
```

Now every file you add will immediately upload and update its progress!
You can also add drag and drop support as we mentioned before, but i didn't include it here to make the example shorter.

### What's next?

This is one of my favorite topics, there are countless ways to improve this component, the limit is your imagination.
The next step for might be handling uploading huge files, or files that are too big to be uploaded in one go.

You would need to start an upload session with the backend, and then upload the file in chunks.
But talking about that in this post would be a bit too much, so I'll leave it for another time.

Thanks for reading, and I hope you enjoyed this post!
