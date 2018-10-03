import "reflect-metadata";
import { SagaFactory } from '../src/Sagafactory';
import { take } from '../src/decorators';

describe('SagaFactory', () => {

    it('Should get sagas from self', () => {

        class Test extends SagaFactory {
            @take('action')
            *mySaga() {

            }

            *notSaga() {

            }
        }

        const self = new Test();
        const sagas = self.getSagas();
        expect(Object.keys(sagas)).toHaveLength(1);
        expect(Object.values(sagas)[0]).toEqual(self.mySaga);
    })

    it('Should get sagas from others', () => {

        class Test  {
            @take('action')
            *mySaga() {

            }

            *notSaga() {

            }
        }
        const self = new Test();
        const sagas = SagaFactory.fromMetadata(self);
        expect(Object.keys(sagas)).toHaveLength(1);
        expect(Object.values(sagas)[0]).toEqual(self.mySaga);
    })
})