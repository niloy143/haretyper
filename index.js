import { app, BrowserWindow } from "electron";
import path from "path";

app.whenReady().then(() => {
    const newWindow = new BrowserWindow({
        width: 800,
        height: 500,
        icon: path.resolve("./assets/images/icon-512x512.png")
    })
    newWindow.loadFile(path.resolve("./public/index.html"))
}).catch(e => {
    console.log(e)
})