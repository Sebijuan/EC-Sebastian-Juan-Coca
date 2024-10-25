// Función para obtener información básica de un Pokémon
async function obtenerInfoBasicaPokemon(nombrePokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");

        const data = await response.json();
        const nombre = data.name;
        const id = data.id;
        const tipos = data.types.map(typeInfo => typeInfo.type.name);
        const imagen = data.sprites.front_default;

        console.log({ nombre, id, tipos, imagen });
    } catch (error) {
        console.error(error.message);
    }
}

// Función para comparar las estadísticas base de dos Pokémon
async function compararPokemon(pokemon1, pokemon2) {
    try {
        const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`);
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`);
        
        if (!response1.ok || !response2.ok) throw new Error("Uno o ambos Pokémon no encontrados");

        const data1 = await response1.json();
        const data2 = await response2.json();

        const stats1 = data1.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
        const stats2 = data2.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

        console.table([
            { Pokemon: data1.name, "Total Stats": stats1 },
            { Pokemon: data2.name, "Total Stats": stats2 }
        ]);

        const mejorPokemon = stats1 > stats2 ? data1.name : data2.name;
        console.log(`${mejorPokemon} tiene mejores estadísticas generales.`);
    } catch (error) {
        console.error(error.message);
    }
}

// Función para obtener la cadena de evolución y habilidades de un Pokémon
async function obtenerCadenaEvolutiva(pokemon) {
    try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}`);
        if (!speciesResponse.ok) throw new Error("Pokémon no encontrado");

        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        const evoluciones = [];
        let actual = evolutionData.chain;

        while (actual) {
            const evolucion = await fetch(`https://pokeapi.co/api/v2/pokemon/${actual.species.name}`);
            const evolucionData = await evolucion.json();

            const habilidades = evolucionData.abilities.map(abilityInfo => abilityInfo.ability.name);
            evoluciones.push({ nombre: actual.species.name, habilidades });

            actual = actual.evolves_to[0];
        }

        console.log(evoluciones);
    } catch (error) {
        console.error(error.message);
    }
}

// Pruebas de las funciones
// Parte 1: Información Básica del Pokémon
obtenerInfoBasicaPokemon("pikachu");
obtenerInfoBasicaPokemon("charizard");
obtenerInfoBasicaPokemon("fakepokemon");

// Parte 2: Comparativa de Pokémon
compararPokemon("bulbasaur", "squirtle");
compararPokemon("gengar", "alakazam");

// Parte 3: Evoluciones y Habilidades
obtenerCadenaEvolutiva("charmander");
obtenerCadenaEvolutiva("tauros");
