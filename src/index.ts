import CSServer from "./lib/server";

async function start() {
    const Port = 5001;
    const Server = await CSServer.listen(Port, () => {
        console.log(`Server is running on the ${Port} port.`);
    });
}

// starting server
start();
