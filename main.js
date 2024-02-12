
// * Псевдо API
const response = {
    services: [
        {
            id: 1,
            head: null,
            name: "Проф.осмотр",
            node: 0,
            price: 100.0,
            sorthead: 20,
        },
        {
            id: 2,
            head: null,
            name: "Хирургия",
            node: 1,
            price: 0.0,
            sorthead: 10,
        },
        {
            id: 3,
            head: 2,
            name: "Удаление зубов",
            node: 1,
            price: 0.0,
            sorthead: 10,
        },
        {
            id: 11,
            head: 3,
            name: "АААА",
            node: 0,
            price: 2000.0,
            sorthead: 40,
        },
        {
            id: 4,
            head: 3,
            name: "Удаление зуба",
            node: 0,
            price: 800.0,
            sorthead: 10,
        },
        {
            id: 5,
            head: 3,
            name: "Удаление 8ого зуба",
            node: 0,
            price: 1000.0,
            sorthead: 30,
        },
        {
            id: 6,
            head: 3,
            name: "Удаление осколка зуба",
            node: 0,
            price: 2000.0,
            sorthead: 20,
        },
        {
            id: 7,
            head: 2,
            name: "Хирургические вмешательство",
            node: 0,
            price: 200.0,
            sorthead: 10,
        },
        {
            id: 8,
            head: 2,
            name: "Имплантация зубов",
            node: 1,
            price: 0.0,
            sorthead: 20,
        },
        {
            id: 9,
            head: 8,
            name: "Коронка",
            node: 0,
            price: 3000.0,
            sorthead: 10,
        },
        {
            id: 10,
            head: 8,
            name: "Слепок челюсти",
            node: 0,
            price: 500.0,
            sorthead: 20,
        },
    ],
};

const root = document.getElementsByClassName("root")[0];
const services = response.services;

renderTreeInRoot(root, services);

function renderTreeInRoot(root, data) {
    data = sortTreeData(data);

    for (const item of data) {
        let html = "";

        if (item.node === 1) html = createNode(item);
        else if (item.node === 0) html = createList(item);

        let parent = item.head === null
                    ? root
                    : document.getElementsByClassName(`node-${item.head}`)[0];

        parent?.appendChild(html);
    }

    // sortAllTree();
}

function sortTreeData(data) {
    let sortedData = [];

    const nodesFromRoot = data.filter((el) => el.head === null);

    nodesFromRoot.sort((first, second) => first.sorthead - second.sorthead);

    nodesFromRoot.forEach((el) => sortedData.push(el));

    for (const item of data) {
        const childs = data.filter((el) => el.head === item.id);

        childs.sort((first, second) =>  first.sorthead - second.sorthead);

        childs.forEach((el) => {
            if (!sortedData.includes(el)) sortedData.push(el);
        });
    }

    return sortedData;
}

function createList(item) {
    let html = document.createElement("div");
    html.classList.add("list", `list-${item.id}`, `sorthead-${item.sorthead}`);

    html.innerHTML = `<span class="content">${item.name} (${item.price})</span>`;

    return html;
}

function createNode(item) {
    let html = document.createElement("div");
    html.classList.add("node", `node-${item.id}`, `sorthead-${item.sorthead}`);

    html.innerHTML = `<div class="node-title node-${item.id}-title">
                            <span class="name">${item.name}</span>
                        </div>`;

    return html;
}

// * Функция сортировки дерева уже после его отрисовки
// function sortAllTree() {
//     const nodes = document.getElementsByClassName("node");

//     for (const node of nodes) {
//         const childs = Array.prototype.slice.call(node?.childNodes);

//         childs.sort((first, second) => {
//             first = first.classList.value?.split("sorthead-")[1];
//             second = second.classList.value?.split("sorthead-")[1];

//             return first - second;
//         });

//         childs.forEach((el) => {
//             node.appendChild(el);
//         });
//     }
// }