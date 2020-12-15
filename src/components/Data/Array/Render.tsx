import hash from 'object-hash';
import React, { FC, SyntheticEvent, useContext, useEffect } from 'react';
import { FormSection, WrappedFieldArrayProps } from 'redux-form';

import { FormidableContext } from '../../../index';
import initializeValues from '../../../utils/initializeValues';
import Button from '../../Button';
import Field from '../Field';
import Data from '../index';
import { DataArrayProps } from './index';

const DataArrayRender: FC<WrappedFieldArrayProps & DataArrayProps> = ({
  addButtonClassName,
  addButtonIcon,
  addButtonLabel,
  addButtonPosition,
  addButtonSize,
  addButtonStatus,
  datas,
  fields,
  formName,
  params,
  removeButtonClassName,
  removeButtonIcon,
  removeButtonLabel,
  removeButtonSize,
  removeButtonStatus,
}) => {
  const { t } = useContext(FormidableContext);

  useEffect(() => {
    if (0 === fields.length) {
      fields.push(initializeValues(datas));
    }
  }, [datas, fields]);

  if (!datas) {
    return <div>datas obligatoire</div>;
  }

  const handleAddButtonOnClick = (): void => {
    fields.push(initializeValues(datas));
  };

  const handleRemoveButtonOnClick = (
    event: SyntheticEvent<HTMLButtonElement>,
  ): void => {
    const index = event.currentTarget.getAttribute('data-index');

    if (index) {
      fields.remove(parseInt(index, 10));
    }
  };

  return (
    <div>
      {'top' === addButtonPosition && (
        <Button
          className={addButtonClassName}
          iconLeft={addButtonIcon}
          onClick={handleAddButtonOnClick}
          size={addButtonSize}
          status={addButtonStatus}
        >
          {addButtonLabel}
        </Button>
      )}

      {fields &&
        fields.map((field, index) => {
          const removeCmp = (removeButtonIcon || removeButtonLabel) && (
            <Button
              className={removeButtonClassName}
              data-index={index}
              iconLeft={removeButtonIcon}
              onClick={handleRemoveButtonOnClick}
              size={removeButtonSize}
              status={removeButtonStatus}
            >
              {t && removeButtonLabel
                ? t(removeButtonLabel)
                : removeButtonLabel}
            </Button>
          );

          if (datas && datas.length > 0) {
            if (datas.length > 1 || datas[0].datas) {
              return (
                <FormSection key={`${field}_${hash(datas)}`} name={field}>
                  {datas.map(value => (
                    <Data
                      key={`${field}_${hash(value)}`}
                      {...value}
                      customInfos={removeCmp}
                      formName={formName}
                      params={{
                        ...params,
                        name: field,
                      }}
                    />
                  ))}
                </FormSection>
              );
            }

            return (
              <Data
                key={field}
                {...datas[0]}
                customInfos={removeCmp}
                formName={formName}
                name={field}
                params={{
                  ...params,
                  name: field,
                }}
              />
            );
          }

          return (
            <Field
              key={field}
              componentType="input"
              customInfos={removeCmp}
              formName={formName}
              name={field}
              params={{
                ...params,
                name: field,
              }}
            />
          );
        })}

      {'bottom' === addButtonPosition && (
        <Button
          iconLeft={addButtonIcon}
          onClick={handleAddButtonOnClick}
          size={addButtonSize}
          status={addButtonStatus}
        >
          {t && addButtonLabel ? t(addButtonLabel) : addButtonLabel}
        </Button>
      )}
    </div>
  );
};

export default DataArrayRender;
