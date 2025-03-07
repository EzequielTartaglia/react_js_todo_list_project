export default function Instrucciones() {
    return (
        <>
            <h1>Instrucciones</h1>
            <LogInInstructions />
        </>
    );
}

function LogInInstructions() {
    return (
        <>
            <p>
                En <b className='titleBolder'>Making time</b> podrás gestionar cómo utilizar tu tiempo de manera eficaz, con funciones tales como:
            </p>
            <ul className='listApp'>
                <li>Agregar tareas</li>
                <li>Buscarlas en tu lista</li>
                <li>Inicializarlas</li>
                <li>Almacenarlas</li>
                <li>Concluirlas</li>
                <li>Eliminarlas</li>
            </ul>
        </>
    );
}
