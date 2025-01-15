
const hProfile = document.location.origin + `/e-commerce/admin/fonction/`;

function updateProfile(fd)
{
    const url = hProfile + `modifier_profil.php`;

    let nom = document.getElementById("nom");
    let email = document.getElementById("email");

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Suppression réussie, mettre à jour l'interface utilisateur
                alert(xhr.responseText);
            } else {
                // Gérer les erreurs
                console.error('Erreur lors de l\'opération de mise à jour');
            }
        }
    };
    xhr.send(`nom=${nom.value}&email=${email.value}`); // Envoyer l'identifiant du produit à supprimer

}

function updatePassword()
{
    const url = hProfile + `modifier_mot_de_passe.php`;

    let password = document.getElementById("currentPassword");
    let newpassword = document.getElementById("newPassword");
    let renewpassword = document.getElementById("renewPassword");

    if(newpassword.value == renewpassword.value)
    {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Suppression réussie, mettre à jour l'interface utilisateur
                    alert(xhr.responseText);
                    document.location.reload();
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de l\'opération de modification');
                }
            }
        };
        xhr.send(`old_pwd=${password.value}&pwd=${newpassword.value}`);
    }
    else
    {
        alert("Le champ de confirmation du mot de passe ne correspond pas au nouveau mot de passe");
    }
}

(function()
{
    let editProfileForm = document.getElementById("edit-profile-form");
    let editPwdForm = document.getElementById("edit-pwd-form");

    editProfileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateProfile();
    });

    editPwdForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updatePassword();
    });
}
)();