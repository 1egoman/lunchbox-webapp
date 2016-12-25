import React from 'react';

// the given keys that are used as quantity presets
let keys = ['small', 'medium', 'large'];

export default function QuantityPicker({item, onChange, ...props}) {
	// return the subset of quantity presets that have been defined on this item.
	// (this essentially does an intersection)
	let specifiedQuantityPresets = [];
	if (item.quantityPresets) {
		specifiedQuantityPresets = keys.filter(k => {
			return Object.keys(item.quantityPresets).indexOf(k) >= 0;
		});
	}

	return <div className="item-quantity">
    <input
      type="text"
      placeholder={`Enter quantity of item ${item.name}`}
      value={item.quantity || ''}
      onChange={onChange}
			{...props}
    />

    {specifiedQuantityPresets.map(size => {
      return <button key={size} onClick={onChange.bind(null, {
				target: {
					value: item.quantityPresets[size],
				},
      })}>
        <img alt={size} src={`images/${size}.png`} />
      </button>;
    })}
	</div>;
}
