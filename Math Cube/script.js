document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("grid-container");
    const refreshButton = document.getElementById("refresh-button");
    const helpButton = document.getElementById("help-button");

    // Función para generar números aleatorios en cada cuadrado
    function generateNumbers() {
        container.innerHTML = ""; // Vaciar el contenedor antes de generar nuevos cuadrados

        for (let i = 0; i < 36; i++) {  // 6x6 = 36 elementos
            const square = document.createElement("div");
            square.classList.add("square");

            // Genera un número aleatorio entre 1 y 99
            const randomNum = Math.floor(Math.random() * 99) + 1;
            square.textContent = randomNum;

            // Añadir el evento de selección al hacer clic en el número
            square.addEventListener("mousedown", handleMouseDown);

            container.appendChild(square);
        }
    }

    // Genera los números aleatorios al cargar la página
    generateNumbers();

    // Agrega el evento click al botón de refresh para actualizar los números
    refreshButton.addEventListener("click", generateNumbers);

    let selectedSquare = null; // Guardará el cuadrado seleccionado
    let startX, startY; // Posición inicial del mouse

    function handleMouseDown(event) {
        selectedSquare = event.target;
        startX = event.clientX;
        startY = event.clientY;

        // Agregar el evento para detectar el movimiento del mouse
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(event) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        let targetSquare = null;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Movimiento horizontal
            if (deltaX > 50) {
                // Derecha
                targetSquare = selectedSquare.nextElementSibling;
            } else if (deltaX < -50) {
                // Izquierda
                targetSquare = selectedSquare.previousElementSibling;
            }
        } else {
            // Movimiento vertical
            const index = Array.from(container.children).indexOf(selectedSquare);
            if (deltaY > 50 && index + 6 < 36) {
                // Abajo
                targetSquare = container.children[index + 6];
            } else if (deltaY < -50 && index - 6 >= 0) {
                // Arriba
                targetSquare = container.children[index - 6];
            }
        }

        if (targetSquare) {
            const firstNumber = parseInt(selectedSquare.textContent);
            const secondNumber = parseInt(targetSquare.textContent);

            if (firstNumber === 1) {
                handleMouseUp(); // Limpia la seleccion y remover evento.
                return;
            }

            if (secondNumber % firstNumber === 0) {
                targetSquare.textContent = secondNumber / firstNumber;
            } else {
                alert("No se puede dividir el número seleccionado por el segundo número.");
            }

            // Limpiar la selección y remover eventos de mousemove y mouseup
            handleMouseUp();
        }
    }

    function handleMouseUp() {
        // Limpiar variables y remover eventos
        selectedSquare = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    // Función para mostrar los pares divisibles
    function showDivisiblePairs() {
        // Limpia cualquier resaltado previo
        document.querySelectorAll(".highlight").forEach(square => {
            square.classList.remove("highlight");
        });

        const squares = Array.from(container.children);
        
        squares.forEach((square, index) => {
            const firstNumber = parseInt(square.textContent);
            
            // Evitar marcar el 1 como divisor
            if (firstNumber === 1) {
                return;
            }

            // Comprobar los vecinos (arriba, abajo, izquierda, derecha)
            const neighbors = [
                index - 6 >= 0 ? squares[index - 6] : null, // Arriba
                index + 6 < 36 ? squares[index + 6] : null,  // Abajo
                (index % 6 !== 0) ? squares[index - 1] : null, // Izquierda
                (index % 6 !== 5) ? squares[index + 1] : null  // Derecha
            ];

            neighbors.forEach(neighbor => {
                if (neighbor) {
                    const secondNumber = parseInt(neighbor.textContent);
                    // Evita marcar el numero 1 ni como divisor y numero divisible.
                    if (secondNumber !== 1 && secondNumber % firstNumber === 0) {
                        square.classList.add("highlight");
                        neighbor.classList.add("highlight");
                    }
                }
            });
        });
    }

    // Agrega el evento click al botón de ayuda
    helpButton.addEventListener("click", showDivisiblePairs);
});

