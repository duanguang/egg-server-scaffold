import { Controller } from 'egg';
import { HttpClientResponse } from 'urllib';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'hi,egg';
  }
}
