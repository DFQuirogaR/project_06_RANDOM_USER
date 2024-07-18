import axios from 'axios';
import { useEffect, useState } from 'react';

export const RandomUser = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        // Defienir una función asincrona para la petición a la API
        const fetchData = async (e) => {
            try {
                //e.preventDefault();
                // Realizar la petición de la API
                const response = await axios.get("https://api.randomuser.me");

                // Obtener los datos de la petición
                const data = response.data;

                // Formatear los datos a mostrar
                const userData = {
                    name: data.results[0].name,
                    email: data.results[0].email,
                    phone: data.results[0].phone,
                    city: data.results[0].location.city,
                    state: data.results[0].location.state,
                    country: data.results[0].location.country,
                    picture: data.results[0].picture.large
                };

                // Actualizar la variable de estado con los datos recibidos de la API pero formateados
                setUser(userData);

            } catch (error) {
                console.error("Error al consultar los datos de la API", error)
            }
        };
        fetchData();

        const intervalId = setInterval(fetchData, 2000);

        return () => clearInterval(intervalId);

    }, []); // Array de dependencias vacío para que useEffect se ejecute una vez

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='col-lg-4'>
                    <div className="card text-center" >
                        <div className='card-header'>
                            <img src={user?.picture} alt="" />
                        </div>
                        <div className="card-body">
                            <h4 className='card-title'>{user?.name.first}</h4>
                            <h4 className='card-title'>{user?.name.last}</h4>
                            <p className="card-text">{user?.email}</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}
