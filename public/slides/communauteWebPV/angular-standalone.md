## Standalone APIs

- Standalone components <!-- .element: class="fragment" -->
- Standalone applications <!-- .element: class="fragment" -->

Note:

Disponibles depuis la v14 et en standard avec la v15.

L'idée est d'avoir du code simple. De se débarrasser des modules (Module racine de l'application, routing modules). Et donc moins de fichiers au bout du compte. ("moins de fichiers pour un hello world")

Mais aussi un énorme gain en optimisation (tree-shaking) et en performance. On supprime le problème des modules "fourre-tout"

---

## Standalone components

```ts [2]
@Component({
  standalone: true,
  selector: 'app-root',
  template: `<div>Hello World</div>`
})
export class AppComponent {}
```

Note: 
La magie c'est le 'standalone : true'.
Le composant est autonome. Je n'ai plus besoin de le déclarer dans un module.

On remarque ici que c'est même mon root component qui est déclarer en standalone...

---

## Standalone applications

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component.ts';

bootstrapApplication(AppComponent)
```

Note:
On boostrape directement un composant et non plus un module

---

## Créer un composant ou une application

```
ng generate component mon-composant --standalone
```

```
ng new mon-application --standalone
```

---

## Les imports dans les composants

```ts [4-5]
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HeaderComponent]
  template: `<app-header></app-header>`
})
export class AppComponent {}
```

Note:
Si on se débarrasse des modules, alors comment gère-t-on les dépendances (imports, providers, le routing)

Dans l'exemple, un header qui lui aussi est un standalone component est importé dans le composant racine

---

## Le routing

```ts [1-10|12-14|13|4|8]
export const routes:Route[] = [
  {
    path: 'ici',
    loadComponent: () => import('./components/ici.component').then(c => c.IciComponent)
  },
  {
    path: 'la',
    loadChildren: () => import('./components/la.routes').then(r => r.LaRoutes)
  },
]

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

Notes:
- Je crée un tableau de routes
- Je le provide sur le boostrap de mon application
- Je peux charger des composant ou des routes enfants

---

## Et les services?

```ts [5-6]
...
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(MatButtonModule)
  ]
});
```

Note:
Je provide mes routes, mais je peux aussi provider des services (notamment HttpClient)

Rq1: providers existe aussi sur les composants

Rq2: ici je le fait directement dans mon boostrap. Généralement on crée un fichier de configuration et un fichier de routes que l'on passe en paramètres du boostrap

---

## Doit-on utiliser les standalones?

Note:

La première question: si c'est si bien que ça, pourquoi les modules n'ont pas tout simplement disparus?

L'équipe d'angular ne veut pas reproduire les erreurs angularJS<->angular. Les modules existerons encore pendant un long moment.

En revanche **ils poussent fortement vers les standalones**. Et après en avoir discuté il n'existe aucune raison valable, encore moins sur un nouveau projet, de continuer à utiliser des modules.

