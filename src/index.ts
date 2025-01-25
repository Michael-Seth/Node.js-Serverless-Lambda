import app from "./app"

async function startServer() {
    try {
        const port = 3210
        app.listen(port, ()=>{
            console.log(`Server started at http://localhost:${port} 🔥🔥🔥`)
        })

        process.once("SIGUSR2", ()=>{
            process.kill(process.pid, "SIGUSR2")
        })

        process.on("SIGINT", ()=>{
            process.kill(process.pid, "SIGINT")
        })
        
    } catch (error) {
        console.error(`Unexpected error occured during startup: ${error}`)
        process.exit(1)
    }
}

startServer()