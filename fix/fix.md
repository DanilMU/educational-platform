Глобальная ошибка: NotFoundException: Cannot GET /analytics/current-user
    at callback (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\routes-resolver.js:77:19)    
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\router-proxy.js:9:23
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:297:9
    at processParams (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:582:12)
    at next (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:291:5)
    at urlencodedParser (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\body-parser\lib\types\urlencoded.js:68:7)
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13) {
  response: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  status: 404,
  options: {}
}
Ошибка HttpException: {
  status: 404,
  message: 'Cannot GET /analytics/current-user',  
  responseObj: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  path: '/analytics/current-user',
  method: 'GET',
  timestamp: '2025-11-29T22:38:56.178Z'
}
Глобальная ошибка: UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\passport\dist\auth.guard.js:60:30)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\passport\dist\auth.guard.js:44:124
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\passport\dist\auth.guard.js:83:24
    at allFailed (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport\lib\middleware\authenticate.js:110:18)
    at attempt (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport\lib\middleware\authenticate.js:183:28)
    at strategy.fail (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport\lib\middleware\authenticate.js:314:9)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport-jwt\lib\strategy.js:106:33
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\jsonwebtoken\verify.js:190:16
    at getSecret (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\jsonwebtoken\verify.js:97:14)
    at module.exports [as verify] (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\jsonwebtoken\verify.js:101:10) {
  response: { message: 'Unauthorized', statusCode: 401 },
  status: 401,
  options: {}
}
Ошибка HttpException: {
  status: 401,
  message: 'Unauthorized',
  responseObj: { message: 'Unauthorized', statusCode: 401 },
  path: '/progress',
  method: 'GET',
  timestamp: '2025-11-29T22:38:56.224Z'
}
Глобальная ошибка: UnauthorizedException: Unauthorized
    at JwtAuthGuard.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\passport\dist\auth.guard.js:60:30)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\passport\dist\auth.guard.js:44:124
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\passport\dist\auth.guard.js:83:24
    at allFailed (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport\lib\middleware\authenticate.js:110:18)
    at attempt (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport\lib\middleware\authenticate.js:183:28)
    at strategy.fail (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport\lib\middleware\authenticate.js:314:9)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\passport-jwt\lib\strategy.js:106:33
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\jsonwebtoken\verify.js:190:16
    at getSecret (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\jsonwebtoken\verify.js:97:14)
    at module.exports [as verify] (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\jsonwebtoken\verify.js:101:10) {
  response: { message: 'Unauthorized', statusCode: 401 },
  status: 401,
  options: {}
}
Ошибка HttpException: {
  status: 401,
  message: 'Unauthorized',
  responseObj: { message: 'Unauthorized', statusCode: 401 },
  path: '/users/@me',
  method: 'GET',
  timestamp: '2025-11-29T22:38:56.258Z'
}
Cookies received: {
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWRsOWRtOTAwMDB2MDljYzZkdzRlYngiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjQ0NDEzODAsImV4cCI6MTc2NTA0NjE4MH0.0DqdHrISgNsGypQWqMJ-s7mqENtig5qZw5G6EEUa_NY',
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWRsOWRtOTAwMDB2MDljYzZkdzRlYngiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjQ0NDEzODAsImV4cCI6MTc2NDQ0ODU4MH0.VMXu3H4Tb321M2Tn5HPkf2u5bh7egsjAvjPfGIrHDgM',
  __next_hmr_refresh_hash__: '48'
}
Verifying refresh token...
Verified payload: {
  id: 'cmidl9dm90000v09cc6dw4ebx',
  role: 'ADMIN',
  iat: 1764441380,
  exp: 1765046180
}
Cookies received: {
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWRsOWRtOTAwMDB2MDljYzZkdzRlYngiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjQ0NDEzODAsImV4cCI6MTc2NTA0NjE4MH0.0DqdHrISgNsGypQWqMJ-s7mqENtig5qZw5G6EEUa_NY',
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWRsOWRtOTAwMDB2MDljYzZkdzRlYngiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjQ0NDEzODAsImV4cCI6MTc2NDQ0ODU4MH0.VMXu3H4Tb321M2Tn5HPkf2u5bh7egsjAvjPfGIrHDgM',
  __next_hmr_refresh_hash__: '48'
}
Verifying refresh token...
Verified payload: {
  id: 'cmidl9dm90000v09cc6dw4ebx',
  role: 'ADMIN',
  iat: 1764441380,
  exp: 1765046180
}
Глобальная ошибка: NotFoundException: Cannot GET /analytics/current-user
    at callback (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\routes-resolver.js:77:19)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\router-proxy.js:9:23
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:297:9
    at processParams (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:582:12)
    at next (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:291:5)
    at urlencodedParser (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\body-parser\lib\types\urlencoded.js:68:7)
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13) {
  response: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  status: 404,
  options: {}
}
Ошибка HttpException: {
  status: 404,
  message: 'Cannot GET /analytics/current-user',
  responseObj: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  path: '/analytics/current-user',
  method: 'GET',
  timestamp: '2025-11-29T22:38:57.267Z'
}
Глобальная ошибка: NotFoundException: Cannot GET /uploads/1764426582668-LostArk_sample.jpg
    at callback (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\routes-resolver.js:77:19)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\router-proxy.js:9:23
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:297:9
    at processParams (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:582:12)
    at next (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:291:5)
    at urlencodedParser (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\body-parser\lib\types\urlencoded.js:68:7)
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13) {
  response: {
    message: 'Cannot GET /uploads/1764426582668-LostArk_sample.jpg',
    error: 'Not Found',
    statusCode: 404
  },
  status: 404,
  options: {}
}
Ошибка HttpException: {
  status: 404,
  message: 'Cannot GET /uploads/1764426582668-LostArk_sample.jpg',
  responseObj: {
    message: 'Cannot GET /uploads/1764426582668-LostArk_sample.jpg',
    error: 'Not Found',
    statusCode: 404
  },
  path: '/uploads/1764426582668-LostArk_sample.jpg',
  method: 'GET',
  timestamp: '2025-11-29T22:38:57.272Z'
}
Глобальная ошибка: NotFoundException: Cannot GET /analytics/current-user
    at callback (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\routes-resolver.js:77:19)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\router-proxy.js:9:23
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:297:9
    at processParams (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:582:12)
    at next (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:291:5)
    at urlencodedParser (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\body-parser\lib\types\urlencoded.js:68:7)
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13) {
  response: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  status: 404,
  options: {}
}
Ошибка HttpException: {
  status: 404,
  message: 'Cannot GET /analytics/current-user',
  responseObj: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  path: '/analytics/current-user',
  method: 'GET',
  timestamp: '2025-11-29T22:38:59.279Z'
}
Глобальная ошибка: NotFoundException: Cannot GET /analytics/current-user
    at callback (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\routes-resolver.js:77:19)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@nestjs\core\router\router-proxy.js:9:23
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13)
    at H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:297:9
    at processParams (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:582:12)
    at next (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:291:5)
    at urlencodedParser (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\body-parser\lib\types\urlencoded.js:68:7)
    at Layer.handleRequest (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\lib\layer.js:152:17)
    at trimPrefix (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\router\index.js:342:13) {
  response: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  status: 404,
  options: {}
}
Ошибка HttpException: {
  status: 404,
  message: 'Cannot GET /analytics/current-user',
  responseObj: {
    message: 'Cannot GET /analytics/current-user',
    error: 'Not Found',
    statusCode: 404
  },
  path: '/analytics/current-user',
  method: 'GET',
  timestamp: '2025-11-29T22:39:03.303Z'
}
Глобальная ошибка: PrismaClientValidationError: 
Invalid `                       this.prisma.subject.findMany()` invocation in
H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

  23 ): Promise<{ subjects: Subject[]; total: number }> {
  24    return this.prisma
  25            .$transaction([
→ 26                    this.prisma.subject.findMany({
       skip: NaN,
     + take: Int
     })

Argument `take` is missing.
    at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9) 
    at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
    at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
    at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
    at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
  clientVersion: '6.19.0'
}
Неизвестная ошибка: {
  error: PrismaClientValidationError:
  Invalid `                     this.prisma.subject.findMany()` invocation in
  H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

    23 ): Promise<{ subjects: Subject[]; total: number }> {
    24  return this.prisma
    25          .$transaction([
  → 26                  this.prisma.subject.findMany({
         skip: NaN,
       + take: Int
       })

  Argument `take` is missing.
      at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9)
      at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
      at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
      at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
      at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
    clientVersion: '6.19.0'
  },
  path: '/subjects',
  method: 'GET',
  timestamp: '2025-11-29T22:39:05.648Z'
}
Глобальная ошибка: PrismaClientValidationError: 
Invalid `                       this.prisma.subject.findMany()` invocation in
H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

  23 ): Promise<{ subjects: Subject[]; total: number }> {
  24    return this.prisma
  25            .$transaction([
→ 26                    this.prisma.subject.findMany({
       skip: NaN,
     + take: Int
     })

Argument `take` is missing.
    at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9) 
    at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
    at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
    at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
    at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
  clientVersion: '6.19.0'
}
Неизвестная ошибка: {
  error: PrismaClientValidationError:
  Invalid `                     this.prisma.subject.findMany()` invocation in
  H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

    23 ): Promise<{ subjects: Subject[]; total: number }> {
    24  return this.prisma
    25          .$transaction([
  → 26                  this.prisma.subject.findMany({
         skip: NaN,
       + take: Int
       })

  Argument `take` is missing.
      at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9)
      at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
      at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
      at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
      at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
    clientVersion: '6.19.0'
  },
  path: '/subjects',
  method: 'GET',
  timestamp: '2025-11-29T22:39:06.663Z'
}
Глобальная ошибка: PrismaClientValidationError: 
Invalid `                       this.prisma.subject.findMany()` invocation in
H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

  23 ): Promise<{ subjects: Subject[]; total: number }> {
  24    return this.prisma
  25            .$transaction([
→ 26                    this.prisma.subject.findMany({
       skip: NaN,
     + take: Int
     })

Argument `take` is missing.
    at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9) 
    at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
    at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
    at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
    at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
  clientVersion: '6.19.0'
}
Неизвестная ошибка: {
  error: PrismaClientValidationError:
  Invalid `                     this.prisma.subject.findMany()` invocation in
  H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

    23 ): Promise<{ subjects: Subject[]; total: number }> {
    24  return this.prisma
    25          .$transaction([
  → 26                  this.prisma.subject.findMany({
         skip: NaN,
       + take: Int
       })

  Argument `take` is missing.
      at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9)
      at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
      at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
      at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
      at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
    clientVersion: '6.19.0'
  },
  path: '/subjects',
  method: 'GET',
  timestamp: '2025-11-29T22:39:08.690Z'
}
Глобальная ошибка: PrismaClientValidationError: 
Invalid `                       this.prisma.subject.findMany()` invocation in
H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

  23 ): Promise<{ subjects: Subject[]; total: number }> {
  24    return this.prisma
  25            .$transaction([
→ 26                    this.prisma.subject.findMany({
       skip: NaN,
     + take: Int
     })

Argument `take` is missing.
    at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9) 
    at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
    at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
    at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
    at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
  clientVersion: '6.19.0'
}
Неизвестная ошибка: {
  error: PrismaClientValidationError:
  Invalid `                     this.prisma.subject.findMany()` invocation in
  H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\src\api\subjects\subjects.service.ts:26:25

    23 ): Promise<{ subjects: Subject[]; total: number }> {
    24  return this.prisma
    25          .$transaction([
  → 26                  this.prisma.subject.findMany({
         skip: NaN,
       + take: Int
       })

  Argument `take` is missing.
      at throwValidationException (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\core\errorRendering\throwValidationException.ts:45:9)
      at ei.handleRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:202:7)
      at ei.handleAndLogRequestError (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:174:12)
      at ei.request (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:143:12)
      at async a (H:\Visual Studio Code\HOME\Git_rep\educational-platform\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:833:24) {
    clientVersion: '6.19.0'
  },
  path: '/subjects',
  method: 'GET',
  timestamp: '2025-11-29T22:39:12.726Z'
}
ROLES_GUARD: Required roles: [ 'ADMIN' ]
ROLES_GUARD: User from request: {
  id: 'cmidl9dm90000v09cc6dw4ebx',
  firstName: 'Данил',
  lastName: 'Мусатов',
  email: 'stackforge@proton.me',
  password: '$argon2id$v=19$m=65536,t=3,p=4$fzZRV4F5gTGN+m3XlezXVg$1fmtbQVYC+SOCrxKdNzUrRdfE6ulHbJq56CMsyUfWhA',
  role: 'ADMIN',
  avatarUrl: 'http://localhost:5000/uploads/1764426582668-LostArk_sample.jpg',
  receiveNotifications: true,
  createdAt: 2025-11-24T20:17:41.932Z,
  updatedAt: 2025-11-29T14:29:44.177Z
}
ROLES_GUARD: User's role: ADMIN
ROLES_GUARD: Has required role: true
ROLES_GUARD: Required roles: [ 'ADMIN' ]
ROLES_GUARD: User from request: {
  id: 'cmidl9dm90000v09cc6dw4ebx',
  firstName: 'Данил',
  lastName: 'Мусатов',
  email: 'stackforge@proton.me',
  password: '$argon2id$v=19$m=65536,t=3,p=4$fzZRV4F5gTGN+m3XlezXVg$1fmtbQVYC+SOCrxKdNzUrRdfE6ulHbJq56CMsyUfWhA',
  role: 'ADMIN',
  avatarUrl: 'http://localhost:5000/uploads/1764426582668-LostArk_sample.jpg',
  receiveNotifications: true,
  createdAt: 2025-11-24T20:17:41.932Z,
  updatedAt: 2025-11-29T14:29:44.177Z
}
ROLES_GUARD: User's role: ADMIN
ROLES_GUARD: Has required role: true
ROLES_GUARD: Required roles: [ 'ADMIN' ]
ROLES_GUARD: User from request: {
  id: 'cmidl9dm90000v09cc6dw4ebx',
  firstName: 'Данил',
  lastName: 'Мусатов',
  email: 'stackforge@proton.me',
  password: '$argon2id$v=19$m=65536,t=3,p=4$fzZRV4F5gTGN+m3XlezXVg$1fmtbQVYC+SOCrxKdNzUrRdfE6ulHbJq56CMsyUfWhA',
  role: 'ADMIN',
  avatarUrl: 'http://localhost:5000/uploads/1764426582668-LostArk_sample.jpg',
  receiveNotifications: true,
  createdAt: 2025-11-24T20:17:41.932Z,
  updatedAt: 2025-11-29T14:29:44.177Z
}
ROLES_GUARD: User's role: ADMIN
ROLES_GUARD: Has required role: true