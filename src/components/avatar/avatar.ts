import '../../../.d';
import { baseURL, PATHS } from '../../utils/routeEnum';
import { Block } from '../block';
import { AvatarProps, AvatarType } from './types';

class Avatar extends Block<AvatarType> {
  public constructor(avatarProps: AvatarProps, events?: EventType) {
    super('img', { ...avatarProps, events});
  }

  public componentDidMount(): void {
    this.getContent().setAttribute("src", "")
  }

  public render(): string {
    if (this.props.src) this.getContent().style.backgroundImage = `url("${baseURL}${PATHS.RESOURCES}${this.props.src}")`
    return "";
  }
}

export { Avatar };

