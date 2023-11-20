# CORS

![image](./slides/communauteWebPV/images/cors.png)

Note:

Remarque sur l'orthographe

---

## Définition

**CORS**: Cross-Origin Resource Sharing (partage de ressource entre origines) 

Règle de sécurité **du navigateur**

Note:

Le CORS ou Cross-Origin Resource Sharing (partage de ressource entre origines) est une règle de sécurité, mise en place sur les navigateurs, depuis 2012 et qui empêche une page/application web d’appeler des données (via une api par exemple) depuis une source dont l’origine est différente de celle du site courant

Quand on parle d’origine, cela signifie le nom de domaine, du sous-domaine ou du port du site.

Par exemple, un site sur https://www.geofolia.fr, n’aurai pas le droit de charger des données venant directement de https://www.arvalis.fr

Quand aux données, cela concerne généralement l’appel d’api externe.
Mais cela concerne aussi, par exemple, les scripts javascript , les polices de caractère,, ou encore, dans certaines conditions les images etc.

D’une manière générale, **dès que l’on a besoin de charger une quelconque ressource venant d’une autre origine, il faut se poser la question.**

---

## Pourquoi ?

Règle de sécurité pour **protéger les utilisateurs** (XSS, CSRF)

Note:

Cette règle a été mise en place, à l’origine pour protéger les utilisateurs et limiter les attaques XSS (Cross-site Scripting) ou CSRF (Cross-site Request Forgery)

C’est important car souvent on pense, à tort, que c’est une sécurité pour un éditeur d’empêcher un site externe de consommer ses ressources/données.

C’est un effet du CORS, facilement contournable (mise en place d’un proxy) mais ce n’est pas la raison première.

---

## Peut-on contourner cette restriction dans le code d’une page Web ?

# NON

Note:

Alors la réponse c’est non, mais elle est importante.

En effet, quelle est la première chose que le développeur va faire quand il tombe la première fois sur cette erreur ?

A tous les coups il va aller chercher sur Google et il y a tout plein de pages qui t’expliquent qu’il faut renseigner des en-têtes dans les requêtes de ta pages.
Il va essayer… et ça ne va pas marcher….

Donc non, ce n’est pas suffisant que d’ajouter des entête dans les appels aux données que l’on veut charger.

L’autorité de confiance reste le serveur qui possède ces données. Si on veut aller chercher des données sur arvalis.fr, c’est le serveur arvalis qui va répondre “oui” ou “non” [geofolia.fr](http://geofolia.fr) a le droit de venir chercher des données chez moi

---

## Alors comment ?

C'est bien le serveur qui a cette charge

- **Access-Control-Allow-Origin**
- **Access-Control-Allow-Methods**
- **Access-Control-Allow-Headers**
- **Access-Control-Allow-Credentials**

Note:

Les serveur, doit fournit au navigateur des entêtes CORS lors de la réponse.

- **Access-Control-Allow-Origin**: Cet en-tête indique les domaines qui ont la permission d’accéder aux ressources du serveur (ex: www.geofolia.fr). Ca peut être une liste d’origines ou des règles avec des wildcars comme ‘*’ qui va autoriser tous les domaines.
- **Access-Control-Allow-Methods**: Cet en-tête indique les méthodes HTTP qui sont autorisées (GET, PUT, DELETE, POST…)
- **Access-Control-Allow-Headers**: Définit les entête de requêtes autorisées. Si cette règle est définie, une requête avec une entête personnalisée peut se voir refusée
- **Access-Control-Allow-Credentials**: C’est un booléen. Cet en-tête indique si les cookies et les informations d’authentification sont autorisés pour accéder aux ressources du serveur

L’entête **Access-Control-Allow-Origin EST OBLIGATOIRE,** les autres sont donc optionnelles.** Le serveur doit donc avoir à disposition la liste des origines autorisées.**

### Preflight

Les requêtes “preflight” CORS sont effectuées par les navigateurs pour vérifier si le serveur autorise les requêtes cross-origin. Généralement avec une requête OPTION

---

## Et donc sur nos API ?

- Configuration de IIS
- OU/ET par le code .Net

Note:

La configuration IIS, par le web.config, est la première référence que l'on va trouver sur le net (module CORS). Pour faire simple on demande à IIS d'envoyer les entêtes CORS à chaque réponse.

.Net propose une librairie nuget pour toutes les version de .net pour gérer le CORS.

Lorsque l'on génère des réponses HTTP, on peut ajouter/modifier les entêtes de réponse depuis le code. Le package nuget simplifie cela et, en gros, on va lui fournir la liste blanche des origines (domaines) à autoriser.

Il faut savoir que la couche outils des API fait déjà ce travail (elle intègre ce package). Cependant ce n'est actuellement pas paramétrable et toutes les origines sont autorisées.
