import { FormBuilderComponent } from "../../../types/formbuider_types";
import {
  useFetchSingleForm,
  useSingleFormValidityCheck,
} from "../formRenderer_hooks";
import Input from "../../../common/_custom/Input/Input";
import Datepick from "../../../common/_custom/Datepick/Datepick";
import TextArea from "../../../common/_custom/Paragraph/TextArea";
import SingleFormBody_Loader from "./components/SingleFormBody_Loader/SingleFormBody_Loader";
import SingleFormBody_Footer from "./components/SingleFormBody_Footer/SingleFormBody_Footer";
import styles from "./SingleFormBody.module.scss";
import SingleSelect from "../../../common/_custom/SingleSelect/SingleSelect";
import MultiSelect from "../../../common/_custom/MultiSelect/MultiSelect";

function SingleFormBody() {
  const { isLoading, formConfig, setFormConfig } = useFetchSingleForm();
  const { validating, isValid, onValidateFormClick } =
    useSingleFormValidityCheck(formConfig, setFormConfig);

  const handleInputChange = (index: number, value: string | number) => {
    setFormConfig((prevConfig) => {
      if (!prevConfig) return prevConfig;
      const updatedComponents = [...prevConfig.components];
      updatedComponents[index] = {
        ...updatedComponents[index],
        value,
      };
      return {
        ...prevConfig,
        components: updatedComponents,
      };
    });
  };

  const renderFormComponent = (
    component: FormBuilderComponent,
    index: number
  ) => {
    switch (component.type) {
      case "Text":
      case "Email":
        return (
          <Input
            key={index}
            placeholder={component.helperText}
            value={component.value || ""}
            onChange={(value) => handleInputChange(index, value)}
            errorMessage={component.errorMessage}
          />
        );
      case "Phone Number":
      case "Number":
        return (
          <Input
            key={index}
            placeholder={component.helperText}
            value={component.value || ""}
            onChange={(value) => handleInputChange(index, value)}
            type="number"
            errorMessage={component.errorMessage}
          />
        );
      case "Description":
        return (
          <TextArea
            key={index}
            placeholder={component.helperText}
            value={component.value || ""}
            onChange={(value) => handleInputChange(index, value)}
            errorMessage={component.errorMessage}
          />
        );
      case "Date":
        return (
          <Datepick
            value={component.value as string}
            onChange={(value) => handleInputChange(index, value)}
            errorMessage={component.errorMessage}
            minDate={component?.additionalProperties?.dateMin || ""}
            maxDate={component?.additionalProperties?.dateMax || ""}
          />
        );
      case "Single Select":
        return (
          <SingleSelect
            options={component.additionalProperties?.options || ""}
            value={component.value as string}
            errorMessage={component.errorMessage as string}
            onChange={(val: string) => handleInputChange(index, val)}
          />
          // <div key={index} className={styles.RadioGroup}>
          //   {(component.additionalProperties?.options || "")
          //     .split(",")
          //     .map((option, idx) => (
          //       <label key={idx} className={styles.RadioLabel}>
          //         <input
          //           type="radio"
          //           name={`single-select-${index}`}
          //           value={option}
          //           checked={component.value === option}
          //           onChange={(e) => handleInputChange(index, e.target.value)}
          //         />
          //         {option}
          //       </label>
          //     ))}
          //   {component.errorMessage && (
          //     <div className={styles.ErrorMessage}>
          //       {component.errorMessage}
          //     </div>
          //   )}
          // </div>
        );
      case "Multi Select":
        return (
          <MultiSelect
            options={component.additionalProperties?.options || ""}
            value={component.value as string}
            errorMessage={component.errorMessage as string}
            onChange={(val: string) => handleInputChange(index, val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.SingleFormBody}>
      {isLoading ? (
        <SingleFormBody_Loader />
      ) : (
        <div className={styles.FormBodyContainer}>
          <div className={styles.Title}>{formConfig?.metadata.name}</div>

          <div className={styles.ComponentsContainer}>
            {formConfig?.components.map(
              (component, index) =>
                !component.isHidden && (
                  <div key={index} className={styles.SingleFormComponent}>
                    <div className={styles.ComponentTitle}>
                      {component.title}
                      {component.isRequired && "*"}
                    </div>
                    <div className={styles.FormComponent}>
                      {renderFormComponent(component, index)}
                    </div>
                  </div>
                )
            )}
          </div>

          {!!formConfig && (
            <SingleFormBody_Footer
              validating={validating}
              isValid={isValid}
              onValidateFormClick={onValidateFormClick}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default SingleFormBody;
