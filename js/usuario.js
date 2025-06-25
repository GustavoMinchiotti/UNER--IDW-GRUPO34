document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("tabla-usuarios");

  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const usuarios = data.users;

    usuarios.forEach(user => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.firstName} ${user.lastName}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
        <td><img src="${user.image}" alt="${user.firstName}" class="rounded-circle" width="50" height="50" /></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    tbody.innerHTML = `<tr><td colspan="5">Error al cargar los datos</td></tr>`;
  }
});
