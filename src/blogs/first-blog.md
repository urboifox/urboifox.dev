---
title: Install Android Studio
summary: Install Android Studio with this guide
tags:
    - tools
    - mobile-development
date: 2023-05-01
readingTime: 10
published: true
image: "/blogs/first-blog/penguin.jpg"
---

## Android Studio

Download Android Studio from [here](https://developer.android.com/studio)

Unzip the tar file with:

```bash
tar -xvf <file-name>.tag.gz
```

```ts
function helloWorld(name: string) {
    console.log(`Hello, ${name}!`);
}
```

Inside the `android-studio` directory, you can open Android Studio from `android-studio/bin/studio.sh`

---

You can put the `android-studio` directory anywhere, or you can make it system-wide by putting it in the `/otp` directory as ChatGPT suggested.

```bash
sudo mv android-studio /otp/android-studio
```

Then you will need to add the android studio binaries to your env variables.

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

### (Optional) Add Android Studio to your desktop env

Add a `.desktop` file for android studio

```bash
sudo vim /usr/share/applications/android-studio.desktop
```

Then add the following content:

```
[Desktop Entry]
Version=1.0
Type=Application
Name=Android Studio
Exec=/opt/android-studio/bin/studio.sh
Icon=/opt/android-studio/bin/studio.png
Terminal=false
Categories=Development;IDE;
```

Refresh desktop

```bash
update-desktop-database
```

## JDK or _Java Development Kit_.

It's required to compile and run apps on the emulator

Install it with:

```bash
sudo apt install openjdk-17-jdk -y
```

Or you can download it from [adoptium](https://adoptium.net/) as shown i react native [docs](https://reactnative.dev/docs/set-up-your-environment#jdk)

You can change jdk version with:

```bash
sudo update-alternatives --config java
```

Then you can set the `JAVA_HOME` environment variable based on where the jdk located.

To see jdk 17 location run:

```bash
sudo update-alternatives --display java
```

Then set this location in your env

```bash
export JAVA_HOME=<path-to-jdk>
export PATH=$JAVA_HOME/bin:$PATH
```
