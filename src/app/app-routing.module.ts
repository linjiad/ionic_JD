import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registerstep1', loadChildren: './registerstep1/registerstep1.module#Registerstep1PageModule' },
  { path: 'registerstep2', loadChildren: './registerstep2/registerstep2.module#Registerstep2PageModule' },
  { path: 'registerstep3', loadChildren: './registerstep3/registerstep3.module#Registerstep3PageModule' },
  { path: 'productlist', loadChildren: './productlist/productlist.module#ProductlistPageModule' },
  { path: 'pcontent', loadChildren: './pcontent/pcontent.module#PcontentPageModule' },
  { path: 'personal', loadChildren: './personal/personal.module#PersonalPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'addressadd', loadChildren: './addressadd/addressadd.module#AddressaddPageModule' },
  { path: 'address', loadChildren: './addresslist/addresslist.module#AddresslistPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
