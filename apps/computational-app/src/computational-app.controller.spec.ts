import { Test, TestingModule } from '@nestjs/testing';
import { ComputationalAppController } from './computational-app.controller';
import { ComputationalAppService } from './computational-app.service';

describe('ComputationalAppController', () => {
  let computationalAppController: ComputationalAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ComputationalAppController],
      providers: [ComputationalAppService],
    }).compile();

    computationalAppController = app.get<ComputationalAppController>(ComputationalAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(computationalAppController.getHello()).toBe('Hello World!');
    });
  });
});
