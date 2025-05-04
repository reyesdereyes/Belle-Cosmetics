import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

function Page() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    async function getProductos() {
        const { data: productos, error } = await supabase.from('product').select()
      
        if (error) {
          console.error('Error al obtener productos:', error.message)
          return
        }
      
        console.log('Productos obtenidos:', productos)
      
        if (productos && productos.length > 0) {
          setProductos(productos)
        }
      }

    getProductos()
  }, [])

  return (
    <div>
      {productos.map((p) => (
        <li key={p.id}>
            <img src={p.imagen} alt=''/>
            {p.nombre}</li>
      ))}
    </div>
  )
}
export default Page