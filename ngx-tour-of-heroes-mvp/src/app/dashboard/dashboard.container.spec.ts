import { asapScheduler, of as observableOf } from 'rxjs';

import { femaleMarvelHeroes } from '../../test/female-marvel-heroes';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { DashboardContainerComponent } from './dashboard.container';

describe(DashboardContainerComponent.name, () => {
  describe('emits top heroes', () => {
    function createHeroServiceStub(): jasmine.SpyObj<HeroService> {
      const stub: jasmine.SpyObj<HeroService> = jasmine.createSpyObj(
        HeroService.name,
        [
          'getHeroes',
        ]);
      resetHeroServiceStub(stub);

      return stub;
    }

    function resetHeroServiceStub(stub: jasmine.SpyObj<HeroService>): void {
      stub.getHeroes
        .and.returnValue(observableOf(femaleMarvelHeroes, asapScheduler))
        .calls.reset();
    }

    let container: DashboardContainerComponent;
    const heroServiceStub: jasmine.SpyObj<HeroService> =
      createHeroServiceStub();

    beforeEach(() => {
      container = new DashboardContainerComponent(
        heroServiceStub as unknown as HeroService);
    });
    afterEach(() => {
      resetHeroServiceStub(heroServiceStub);
    });

    it('emits the top 4 heroes', async () => {
      const heroes: Hero[] = await container.topHeroes$.toPromise();

      expect(heroes.length).toBe(4);
      expect(heroes[0]).toEqual({ id: 2, name: 'Captain Marvel' });
    });

    it(`immediately delegates to ${HeroService.name}`, async () => {
      expect(heroServiceStub.getHeroes).toHaveBeenCalledTimes(1);

      await container.topHeroes$.toPromise();

      expect(heroServiceStub.getHeroes).toHaveBeenCalledTimes(1);
    });
  });
});
