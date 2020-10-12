import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps } from 'redux-form';
import { Form } from 'components/atoms/Forms';
import { CenterContainer, BackgroundButton, Button } from 'components/atoms';
import {
  InputField,
  TextareaField,
  SelectField
} from 'components/organisms/Fields';
import FormErrors from 'components/molecules/FormErrors';
import { Contribution } from 'app/lmem/notice';
import withReduxForm from './withReduxForm';

export interface QuestionFormOwnProps {
  onUrlChange: (url: string) => void;
  onSubmit: (...args: any[]) => void;
  errors: string[];
  error?: string;
}

const Textarea = styled(TextareaField)`
  height: 140px;
`;

export type QuestionFormProps = InjectedFormProps<
  Contribution,
  QuestionFormOwnProps
> &
  QuestionFormOwnProps;

const QuestionForm = ({
  valid,
  handleSubmit,
  submitting,
  error,
  errors,
  onUrlChange
}: QuestionFormProps) => {
  useEffect(() => {
    onUrlChange(window.location.href);
  }, [window.location.href]);

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="url" type="hidden" component={InputField} />
      <Field type="select" component={SelectField}>
        <option value="">Plop</option>
      </Field>
      <Field
        name="message"
        placeholder={`Indiquez votre question.
Précisez éventuellement le nom du média, de l'expert ou de l'informateur que vous souhaitez solliciter.
`}
        rows={4}
        component={Textarea}
      />
      <Field
        name="contributor.name"
        type="text"
        placeholder="Votre nom"
        component={InputField}
      />
      <Field
        name="contributor.email"
        type="email"
        placeholder="Votre@email.fr"
        component={InputField}
      />
      <FormErrors errors={errors} globalError={error} />
      <CenterContainer>
        <Button>Annuler</Button>
        <BackgroundButton
          type="submit"
          disabled={!valid || submitting}
          loading={submitting}
        >
          Envoyer
        </BackgroundButton>
      </CenterContainer>
    </Form>
  );
};

export default withReduxForm(QuestionForm);
