import { Button, FlexRow } from "./CommonComponents";
import { Modal, DialogBox } from "./Modal";

export default function ComfirmationDialog({
  handleClose,
  show,
  headerText,
  detailText,
}) {
  const sendYes = () => handleClose(true);
  const sendNo = () => handleClose(false);

  return (
    <Modal show={show}>
      <DialogBox>
        <h2>{headerText}</h2>
        <p>{detailText}</p>
        <FlexRow>
          <Button color="danger" onClick={sendYes}>
            Yes
          </Button>
          <Button onClick={sendNo}>No</Button>
        </FlexRow>
      </DialogBox>
    </Modal>
  );
}
