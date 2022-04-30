import { BorderActions, BorderActionsType } from './../actions/border.actions';
import { BorderRadiusService } from '../../services/border-radius.service';
import { BorderModel } from '../models/border.model';

const service = new BorderRadiusService();

export const border = new BorderModel(
  service.getBorderRadiusString(),
  service.generateRandomRadiusValues(null)
);

export function BorderReducer(
  state: BorderModel = border,
  action: BorderActions
): BorderModel {
  switch (action.type) {
    case BorderActionsType.VALUES_SET: {
      return { ...state, values: action.payload };
    }
    case BorderActionsType.RADIUS_SET: {
      return { ...state, radius: action.payload };
    }
    case BorderActionsType.ORIGINAL_SET: {
      return { ...state, originalValues: action.payload };
    }
    case BorderActionsType.CLEAR: {
      return new BorderModel(
        service.getBorderRadiusString(),
        service.generateRandomRadiusValues(null)
      );
    }
    default:
      return { ...state };
  }
}
