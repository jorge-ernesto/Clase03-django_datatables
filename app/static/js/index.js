let dataTable;
let dataTableIsInitialized = false;

window.addEventListener("load", async () => {
    await initDataTable();
});

/*
Esta configuración está estableciendo algunas opciones para la inicialización de una tabla utilizando la biblioteca DataTables.

La opción columnDefs define las definiciones de columna personalizadas para la tabla. En este caso, se establecen tres propiedades de columna para ciertas columnas:
    className: establece la clase CSS "centered" en las celdas de las columnas 0 a 6, lo que significa que el contenido de esas celdas se centrará horizontalmente.
    orderable: se establece en false para las columnas 5 y 6, lo que significa que no se permitirá la ordenación en esas columnas.
    searchable: se establece en false para las columnas 0, 5 y 6, lo que significa que no se permitirá la búsqueda en esas columnas.
La opción pageLength establece la cantidad de filas que se mostrarán en cada página de la tabla. En este caso, se establece en 4 filas por página.
La opción lengthMenu establece opciones personalizadas del select "Show x entries"
La opción destroy establece si DataTables debe destruir la tabla existente (si la hay) antes de crear una nueva. En este caso, se establece en true, lo que significa que se eliminará cualquier tabla existente antes de crear la nueva.
*/
const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [0, 5, 6] }
    ],
    pageLength: 5,
    lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]], // Se puede comentar esta linea para ver las opciones por defecto del select "Show x entries"
    destroy: true
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listProgrammers();
    dataTable = $("#datatable_programmers").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
};

const listProgrammers = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/app/list_programmers/");
        const data = await response.json();

        let content = ``;
        data.programmers.forEach((programmer, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${programmer.name}</td>
                    <td>${programmer.country}</td>
                    <td>${programmer.birthday}</td>
                    <td>${programmer.score}</td>
                    <td>${programmer.score >= 8
                        ? "<i class='fa-solid fa-check' style='color: green;'></i>"
                        : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}
                    </td>
                    <td>
                        <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
                        <button class='btn btn-sm btn-danger'><i class='fa-solid fa-trash-can'></i></button>
                    </td>
                </tr>`;
        });
        datatable_data = document.getElementById("datatable_data")
        datatable_data.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};
