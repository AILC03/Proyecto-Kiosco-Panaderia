import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Scanner({ onScan }) {
  const scannerRef = useRef(null);
  const isRunning = useRef(false);

  const [active, setActive] = useState(false);
  const [devices, setDevices] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);

  // 🔥 cargar cámaras
  useEffect(() => {
    Html5Qrcode.getCameras().then(cams => {
      if (cams && cams.length) {
        setDevices(cams);
      }
    });
  }, []);

  // 🔥 iniciar scanner
  useEffect(() => {
    if (!active || !devices.length) return;

    const iniciar = async () => {
      const scanner = new Html5Qrcode("reader");
      scannerRef.current = scanner;

      const cameraId = devices[cameraIndex].id;

      try {
        await scanner.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            try {
              const data = JSON.parse(decodedText);

              // 🔥 enviar datos al Dashboard
              if (onScan) onScan(data);

              detenerScanner();
            } catch {
              console.log("QR inválido");
            }
          }
        );

        isRunning.current = true;

      } catch (err) {
        console.error("Error cámara:", err);
      }
    };

    iniciar();

    return () => {
      if (scannerRef.current && isRunning.current) {
        scannerRef.current.stop().catch(() => {});
        isRunning.current = false;
      }
    };
  }, [active, cameraIndex, devices]);

  const iniciarScanner = () => {
    setActive(true);
  };

  const detenerScanner = async () => {
    if (!scannerRef.current || !isRunning.current) return;

    try {
      await scannerRef.current.stop();
    } catch {}

    isRunning.current = false;
    setActive(false);
  };

  const cambiarCamara = () => {
    if (devices.length <= 1) return;

    setCameraIndex(prev => (prev + 1) % devices.length);
  };

  return (
    <div className="text-center">

      {!active && (
        <button
          onClick={iniciarScanner}
          className="bg-cafe text-white px-4 py-2 rounded-lg"
        >
          Escanear QR
        </button>
      )}

      {active && (
        <>
          <div id="reader" className="w-full max-w-sm mx-auto mt-4" />

          <div className="flex justify-center gap-2 mt-3">

            {devices.length > 1 && (
              <button
                onClick={cambiarCamara}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Cambiar cámara
              </button>
            )}

            <button
              onClick={detenerScanner}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancelar
            </button>

          </div>
        </>
      )}
    </div>
  );
}