// Grafo de caminos:
exports.roadGraph = {
    'Casa de Alicia': ['Casa de Bob', 'Cabaña', 'Oficina de Correos'],
    'Casa de Bob': ['Casa de Alicia', 'Ayuntamiento'],
    'Cabaña': ['Casa de Alicia'],
    'Oficina de Correos': ['Casa de Alicia', 'Mercado'],
    Ayuntamiento: ['Casa de Bob', 'Casa de Daria', 'Mercado', 'Tienda'],
    'Casa de Daria': ['Casa de Ernie', 'Ayuntamiento'],
    'Casa de Ernie': ['Casa de Daria', 'Casa de Grete'],
    'Casa de Grete': ['Casa de Ernie', 'Granja', 'Tienda'],
    Granja: ['Casa de Grete', 'Mercado'],
    Tienda: ['Casa de Grete', 'Mercado', 'Ayuntamiento'],
    Mercado: ['Granja', 'Oficina de Correos', 'Tienda', 'Ayuntamiento']
}