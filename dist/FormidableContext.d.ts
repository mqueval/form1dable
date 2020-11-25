import { TFunction } from 'i18next';
import React, { FC, ReactElement } from 'react';
import { Store } from 'redux';
import { DataProps } from './components/Data';
interface FormidableStateProps {
    extendData?: (props: DataProps & {
        formName: string;
        params?: {
            [key: string]: any;
        };
    }) => ReactElement<any, any> | null;
    getControlStyle?: (props: any) => any;
    store?: Store;
    t?: TFunction;
    theme?: {
        [key: string]: any;
    };
}
declare const FormidableContext: React.Context<FormidableStateProps>;
declare const FormidableProvider: FC<FormidableStateProps>;
export default FormidableContext;
export { FormidableProvider };
