import { fakeAsync, tick } from '@angular/core/testing';
import { asapScheduler, of as observableOf, Subject, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { femaleMarvelHeroes } from '../../test/female-marvel-heroes';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesContainerComponent } from './heroes.container';

describe(HeroesContainerComponent.name, () => {
  function createHeroServiceStub(): jasmine.SpyObj<HeroService> {
    const stub: jasmine.SpyObj<HeroService> = jasmine.createSpyObj(
      HeroService.name,
      [
        'addHero',
        'deleteHero',
        'getHeroes',
      ]);
    resetHeroServiceStub(stub);

    return stub;
  }

  function resetHeroServiceStub(stub: jasmine.SpyObj<HeroService>): void {
    stub.addHero
      .and.callFake(({ name }: Partial<Hero>) => observableOf({
        id: 42,
        name,
      }, asapScheduler))
      .calls.reset();
    stub.deleteHero
      .and.callFake((hero: Hero) => observableOf(hero, asapScheduler))
      .calls.reset();
    stub.getHeroes
      .and.returnValue(observableOf(femaleMarvelHeroes, asapScheduler))
      .calls.reset();
  }

  let container: HeroesContainerComponent;
  const destroy: Subject<void> = new Subject();
  const heroServiceStub: jasmine.SpyObj<HeroService> = createHeroServiceStub();
  const observer: jasmine.Spy = jasmine.createSpy('heroes observer');

  beforeEach(fakeAsync(() => {
    container = new HeroesContainerComponent(
      heroServiceStub as unknown as HeroService);
    container.heroes$.pipe(takeUntil(destroy)).subscribe(observer);
    tick();
  }));

  afterEach(() => {
    destroy.next();
    observer.calls.reset();
    resetHeroServiceStub(heroServiceStub);
  });

  afterAll(() => {
    destroy.complete();
  });

  describe('emits all heroes', () => {
    it('all heroes are emitted after subscribing', () => {
      expect(observer).toHaveBeenCalledWith(femaleMarvelHeroes);
    });

    it(`delegates to ${HeroService.name}`, () => {
      expect(heroServiceStub.getHeroes).toHaveBeenCalledTimes(1);
    });
  });

  describe('adds a hero', () => {
    it('emits the specified hero when server responds', fakeAsync(() => {
      const wonderWoman = 'Wonder Woman';

      container.add(wonderWoman);
      tick();

      expect(observer).toHaveBeenCalledWith([
        ...femaleMarvelHeroes,
        { id: 42, name: wonderWoman },
      ]);
    }));

    it(`delegates to ${HeroService.name}`, () => {
      const hawkeye = 'Hawkeye (Kate Bishop)';

      container.add(hawkeye);

      expect(heroServiceStub.addHero).toHaveBeenCalledTimes(1);
      expect(heroServiceStub.addHero).toHaveBeenCalledWith({ name: hawkeye });
    });

    it('does not emit the specified hero when server fails', fakeAsync(() => {
      heroServiceStub.addHero.and.returnValue(
        throwError(new Error('server error'), asapScheduler));
      const scarletWitch = 'Scarlet Witch';

      container.add(scarletWitch);
      tick();

      expect(observer).not.toHaveBeenCalledWith([
        ...femaleMarvelHeroes,
        { id: 42, name: scarletWitch },
      ]);
    }));
  });

  describe('deletes a hero', () => {
    it(`delegates to ${HeroService.name}`, () => {
      const gamora: Hero = femaleMarvelHeroes.find(x => x.name === 'Gamora');

      container.delete(gamora);

      expect(heroServiceStub.deleteHero).toHaveBeenCalledTimes(1);
      expect(heroServiceStub.deleteHero).toHaveBeenCalledWith(gamora);
    });

    it('emits all other heroes immediately', fakeAsync(() => {
      const elektra: Hero = femaleMarvelHeroes.find(x => x.name === 'Elektra');

      container.delete(elektra);
      tick();

      expect(observer).toHaveBeenCalledWith(
        femaleMarvelHeroes.filter(x => x.id !== elektra.id));
    }));

    it('emits the specified hero when server fails', fakeAsync(() => {
      function compareIdAscending(a: Hero, b: Hero): number {
        return (a.id < b.id)
          ? -1
          : (a.id > b.id)
          ? 1
          : 0;
      }

      heroServiceStub.deleteHero.and.returnValue(
        throwError(new Error('timeout'), asapScheduler));
      const storm: Hero = femaleMarvelHeroes.find(x => x.name === 'Storm');

      container.delete(storm);
      tick();

      const emittedHeroes: Hero[]  = observer.calls.mostRecent().args[0];
      emittedHeroes.sort(compareIdAscending);
      expect(emittedHeroes).toEqual(femaleMarvelHeroes);
    }));
  });
});
