import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SessaoService } from "../services/sessao/sessao.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessaoService,
    private route: Router
  ) {}

  canActivate(): boolean {
    if (this.sessionService.estaLogado()) {
      return true;
    }

    this.route.navigate(['/login']);
    return false;
  }
}
