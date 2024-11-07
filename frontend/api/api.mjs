function send(method, url, data){
    return fetch(`http://34.130.49.194:8080:4000${url}`, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: (data)? JSON.stringify(data): null,
    })
    .then(x => x.json())
}

export function addItem(content){
    return send("POST", "/api/items/", {content});
};

export function deleteItem(id){
    return send("DELETE", "/api/items/" + id + "/", null);
};

export function getItems(){
    return send("GET", "/api/items/", null);
};