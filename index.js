import { app, BrowserWindow, screen } from "electron";

app
	.whenReady()
	.then(() => {
		const { width, height } = screen.getPrimaryDisplay().workAreaSize;

		const newWindow = new BrowserWindow({
			width,
			height,
			icon: "assets/icon.png",
		});
		newWindow.loadFile("public/index.html");
	})
	.catch((e) => {
		console.log(e);
	});
