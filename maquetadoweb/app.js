$(document).ready(function () {
    let step = 1; // Control de pasos
    let selectedService = null; // Servicio seleccionado
    let formData = { // Modelo de datos para almacenar la información
      length: '',
      width: '',
      height: '',
      weight: '',
      origin: '',
      destination: '',
      senderName: '',
      senderAddress: '',
      receiverName: '',
      receiverAddress: '',
    };
  
    function renderStep() {
      $("#form-steps").html(""); // Limpia el contenedor
  
      // Paso 1: Datos básicos del envío
      if (step === 1) {
        $("#form-steps").append(`
          <div>
            <h2>Paso 1: Datos básicos</h2>
            <form id="step1-form">
              <div class="mb-3">
                <label for="length" class="form-label">Largo (cm)</label>
                <input type="number" id="length" class="form-control" value="${formData.length}" required>
              </div>
              <div class="mb-3">
                <label for="width" class="form-label">Ancho (cm)</label>
                <input type="number" id="width" class="form-control" value="${formData.width}" required>
              </div>
              <div class="mb-3">
                <label for="height" class="form-label">Alto (cm)</label>
                <input type="number" id="height" class="form-control" value="${formData.height}" required>
              </div>
              <div class="mb-3">
                <label for="weight" class="form-label">Peso (kg)</label>
                <input type="number" id="weight" class="form-control" value="${formData.weight}" required>
              </div>
              <div class="mb-3">
                <label for="origin" class="form-label">Código postal de origen</label>
                <input type="text" id="origin" class="form-control" value="${formData.origin}" required>
              </div>
              <div class="mb-3">
                <label for="destination" class="form-label">Código postal de destino</label>
                <input type="text" id="destination" class="form-control" value="${formData.destination}" required>
              </div>
              <button type="button" class="btn btn-primary" id="next-button">Siguiente</button>
            </form>
          </div>
        `);
  
        $("#next-button").click(function () {
          if ($("#step1-form")[0].checkValidity()) {
            // Guarda los datos en el modelo
            formData.length = $("#length").val();
            formData.width = $("#width").val();
            formData.height = $("#height").val();
            formData.weight = $("#weight").val();
            formData.origin = $("#origin").val();
            formData.destination = $("#destination").val();
            step++;
            renderStep();
          } else {
            alert("Por favor, completa todos los campos.");
          }
        });
      }
  
      // Paso 2: Opciones de envío
      if (step === 2) {
        $("#form-steps").append(`
          <div>
            <h2>Paso 2: Opciones de envío</h2>
            <div id="services">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">DHL</h5>
                  <p class="card-text">Costo: $150 MXN | Tiempo: 3 días</p>
                  <button class="btn btn-outline-primary select-service" data-service="DHL">Seleccionar</button>
                </div>
              </div>
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">FedEx</h5>
                  <p class="card-text">Costo: $180 MXN | Tiempo: 2 días</p>
                  <button class="btn btn-outline-primary select-service" data-service="FedEx">Seleccionar</button>
                </div>
              </div>
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">Estafeta</h5>
                  <p class="card-text">Costo: $140 MXN | Tiempo: 4 días</p>
                  <button class="btn btn-outline-primary select-service" data-service="Estafeta">Seleccionar</button>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" id="back-button">Volver</button>
          </div>
        `);
  
        $(".select-service").click(function () {
          selectedService = $(this).data("service");
          step++;
          renderStep();
        });
  
        $("#back-button").click(function () {
          step--;
          renderStep();
        });
      }
  
      // Paso 3: Información detallada
      if (step === 3) {
        $("#form-steps").append(`
          <div>
            <h2>Paso 3: Información detallada</h2>
            <form id="step3-form">
              <h4>Remitente</h4>
              <div class="mb-3">
                <label for="sender-name" class="form-label">Nombre completo</label>
                <input type="text" id="sender-name" class="form-control" value="${formData.senderName}" required>
              </div>
              <div class="mb-3">
                <label for="sender-address" class="form-label">Dirección</label>
                <input type="text" id="sender-address" class="form-control" value="${formData.senderAddress}" required>
              </div>
              <h4>Destinatario</h4>
              <div class="mb-3">
                <label for="receiver-name" class="form-label">Nombre completo</label>
                <input type="text" id="receiver-name" class="form-control" value="${formData.receiverName}" required>
              </div>
              <div class="mb-3">
                <label for="receiver-address" class="form-label">Dirección</label>
                <input type="text" id="receiver-address" class="form-control" value="${formData.receiverAddress}" required>
              </div>
              <button class="btn btn-secondary" id="back-button">Volver</button>
              <button class="btn btn-success" id="confirm-button">Confirmar envío</button>
            </form>
          </div>
        `);
  
        $("#back-button").click(function () {
          // Guarda los datos antes de volver
          formData.senderName = $("#sender-name").val();
          formData.senderAddress = $("#sender-address").val();
          formData.receiverName = $("#receiver-name").val();
          formData.receiverAddress = $("#receiver-address").val();
          step--;
          renderStep();
        });
  
        $("#confirm-button").click(function () {
          if ($("#step3-form")[0].checkValidity()) {
            formData.senderName = $("#sender-name").val();
            formData.senderAddress = $("#sender-address").val();
            formData.receiverName = $("#receiver-name").val();
            formData.receiverAddress = $("#receiver-address").val();
            step++;
            renderStep();
          } else {
            alert("Por favor, completa todos los campos.");
          }
        });
      }
  
      // Paso 4: Confirmación
      if (step === 4) {
        $("#form-steps").append(`
          <div>
            <h2>¡Envío registrado con éxito!</h2>
            <p>Has seleccionado el servicio de <strong>${selectedService}</strong>.</p>
            <button class="btn btn-primary" id="restart-button">Regresar al inicio</button>
          </div>
        `);
  
        $("#restart-button").click(function () {
          step = 1;
          selectedService = null;
          formData = { // Reinicia los datos
            length: '',
            width: '',
            height: '',
            weight: '',
            origin: '',
            destination: '',
            senderName: '',
            senderAddress: '',
            receiverName: '',
            receiverAddress: '',
          };
          renderStep();
        });
      }
    }
  
    renderStep(); // Inicializa el proceso
  });
  