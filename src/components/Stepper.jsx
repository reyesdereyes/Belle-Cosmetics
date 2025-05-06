import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; // Tu contexto del carrito
import { Toast } from "primereact/toast";

export default function BasicDemo() {
  const stepperRef = useRef(null);
  const toastBC = useRef(null);
  const { cart, dispatch } = useCart();

  const calculateSubtotal = () =>
    cart.items.reduce((total, item) => total + item.precio * item.cantidad, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 100 ? subtotal : subtotal + 10; // Envío gratis si subtotal >= 100
  };

  const handleQuantityChange = (nombre, change) => {
    const updatedItem = cart.items.find((item) => item.nombre === nombre);
    if (updatedItem) {
      const newQuantity = updatedItem.cantidad + change;
      if (newQuantity > 0) {
        dispatch({ type: "UPDATE_CART", payload: { nombre, cantidad: newQuantity } });
      } else {
        dispatch({ type: "REMOVE_FROM_CART", payload: { nombre } });
      }
    }
  };

  const handleRemoveItem = (nombre) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { nombre } });
  };

  const handleEmptyCart = () => {
    toastBC.current.show({
      severity: "warn",
      summary: "¿Estás seguro?",
      detail: "Esta acción vaciará completamente tu carrito.",
      sticky: true,
      position: "center",
      content: (props) => (
        <div className="flex flex-column align-items-center gap-3">
          <div className="font-bold text-lg">{props.message.summary}</div>
          <div className="text-sm text-600">{props.message.detail}</div>
          <div className="flex gap-2">
            <Button
              label="Cancelar"
              className="p-button-outlined p-button-secondary"
              onClick={() => toastBC.current.clear()}
            />
            <Link to="/carrito-vacio">
              <Button
                label="Vaciar Carrito"
                className="p-button-danger"
                icon="pi pi-trash"
                iconPos="left"
                onClick={() => {
                  dispatch({ type: "CLEAR_CART" });
                  toastBC.current.clear();
                }}
              />
            </Link>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="app-container">
      <Toast ref={toastBC} />

      <div className="content-container">
        <div className="transparent-background p-4 rounded">
          <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
            {/* Paso 1: Carrito */}
            <StepperPanel header="Carrito">
              <div>
                {cart.items.length === 0 ? (
                  <p>No hay productos en el carrito.</p>
                ) : (
                  <>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Unidades</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.items.map((item) => (
                          <tr key={item.nombre}>
                            <td>
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                              />
                              <span className="ms-3">{item.nombre}</span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleQuantityChange(item.nombre, -1)}
                                >
                                  -
                                </button>
                                <span className="mx-2">{item.cantidad}</span>
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleQuantityChange(item.nombre, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemoveItem(item.nombre)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-4">
                      <Link to="/productos" className="text-dark">
                        <i className="fas fa-arrow-left me-2"></i> Seguir comprando
                      </Link>
                    </div>

                    <div className="mt-4 text-end">
                      <button className="btn btn-link text-dark" onClick={handleEmptyCart}>
                        Vaciar carrito <i className="fas fa-trash-alt ms-1"></i>
                      </button>
                    </div>

                    <div className="mt-4">
                      <h5>Resumen de Compra</h5>
                      <hr />
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Envío:</span>
                        <span>{calculateSubtotal() >= 100 ? "Gratis" : "$10.00"}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>

                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ingresa un código de descuento"
                        />
                        <button className="btn btn-primary" type="button">
                          Aplicar
                        </button>
                      </div>
                    </div>

                    <div className="alert alert-info mt-4 d-flex align-items-center">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      ¡Recibe tus pedidos con el envío gratis por compras mayores a USD100!
                    </div>

                    <div className="mt-4">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => stepperRef.current.nextCallback()}
                      >
                        Continuar <i className="pi pi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </StepperPanel>

            {/* Paso 2: Información */}
            <StepperPanel header="Información">
              <div className="flex flex-column h-12rem">
                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                  Información de envío: Ingresa tus datos de entrega.
                </div>
              </div>
              <div className="flex pt-4 justify-content-between">
                <Button
                  label="Atrás"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                />
                <Button
                  label="Finalizar"
                  icon="pi pi-check"
                  iconPos="right"
                  onClick={() => alert("Compra finalizada")}
                />
              </div>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </div>
  );
}
