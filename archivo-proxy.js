const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  // Reescribe la URL quitando /api
  

  if (req.url.startsWith('/auth')) {

    console.log('Redirigiendo solicitud a /auth al puerto 8000');
    proxy.web(req, res, { target: 'http://127.0.0.1:8000' });
    
  }else if (req.url.startsWith('/travel')) {
    // Redirige las solicitudes que comienzan con /travel al microservicio de viajes (puerto 2000)
    console.log('Redirigiendo solicitud a /travel al puerto 2000');
    proxy.web(req, res, { target: 'http://localhost:2000' });
  } else {
    // Aquí puedes manejar otras rutas o simplemente registrar las rutas no manejadas
    console.log('Ruta no manejada:', req.url);
    res.statusCode = 404;
    res.end('Ruta no encontrada');
  }
});

server.listen(4000, () => {
  console.log('Servidor proxy inverso en ejecución en el puerto 4000');
});
