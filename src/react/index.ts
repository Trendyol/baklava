import React from 'react';
import { createComponent } from '@lit-labs/react';
import BlIcon from '../components/icon/bl-icon';
import BlButton from '../components/button/bl-button';
import BlInput from '../components/input/bl-input';
import BlBadge from '../components/badge/bl-badge';
import BlTooltip from '../components/tooltip/bl-tooltip';

const _BlIcon = createComponent(React, 'bl-icon', BlIcon, {
  onLoad: 'bl-load',
  onError: 'bl-error',
});
const _BlButton = createComponent(React, 'bl-button', BlButton, {
  onClick: 'bl-click',
});
const _BlInput = createComponent(React, 'bl-input', BlInput, {
  onChange: 'bl-change',
  onInput: 'bl-input',
});
const _BlBadge = createComponent(React, 'bl-badge', BlBadge, {});
const _BlTooltip = createComponent(React, 'bl-tooltip', BlTooltip, {
  onShow: 'bl-tooltip-show',
  onHide: 'bl-tooltip-hide',
});

export { _BlIcon as BlIcon };
export { _BlButton as BlButton };
export { _BlInput as BlInput };
export { _BlBadge as BlBadge };
export { _BlTooltip as BlTooltip };
