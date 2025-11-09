document.getElementById("fetchBtn").addEventListener("click", fetchPokemon);

async function fetchPokemon() {
  const name = document.getElementById("pokemonName").value.toLowerCase();
  const info = document.getElementById("pokemonInfo");

  if (!name) {
    info.innerHTML = "<p>Please enter a Pokémon name!</p>";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Pokémon not found");
    const data = await response.json();

    // Extract data
    const { sprites, height, weight, types, abilities } = data;

    info.innerHTML = `
      <img src="${sprites.front_default}" alt="${name}" class="pokemon-img" />
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <p><strong>Height:</strong> ${height}</p>
      <p><strong>Weight:</strong> ${weight}</p>
      <p><strong>Type:</strong> ${types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> ${abilities.map(a => a.ability.name).join(", ")}</p>
    `;
  } catch (error) {
    info.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}
