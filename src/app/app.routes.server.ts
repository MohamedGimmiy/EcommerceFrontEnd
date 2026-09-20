import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client
  },
  {
    path: 'shop',
    renderMode: RenderMode.Client
  },
  {
    path: 'shop/product-details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'basket',
    renderMode: RenderMode.Client
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client
  },
  {
    path: 'Account',
    renderMode: RenderMode.Client
  },
  {
    path: 'Account/Register',
    renderMode: RenderMode.Client
  },
  {
    path: 'Account/active',
    renderMode: RenderMode.Client
  },
  {
    path: 'Account/Login',
    renderMode: RenderMode.Client
  },
  {
    path: 'Account/Reset-Password',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
