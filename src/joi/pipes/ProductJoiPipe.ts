import { JoiPipe } from 'nestjs-joi'
import { ProductJoiGroup } from '../groups/ProductJoiGroup'

export class ProductJoiPipe {
  static create = new JoiPipe({ group: ProductJoiGroup.create })
  static update = new JoiPipe({ group: ProductJoiGroup.update })
}
