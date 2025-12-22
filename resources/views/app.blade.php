<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/logos/logo.png">
    <link rel="apple-touch-icon" href="/assets/logos/logo.png">
    {!! \App\Providers\Meta::render() !!}
</head>

<body>
    @inertia
</body>

</html>
