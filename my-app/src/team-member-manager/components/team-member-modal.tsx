import { ReactElement, useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Slider,
  useTheme,
  TextField,
  Typography,
} from "@mui/material";
import Cropper, { Area, Point } from "react-easy-crop";

import { TeamMemberContract, TeamMemberUpsertContract } from "../../api/contracts";
import { ModalFooter, ModalWrapper } from "../../components";
import { PersonAdd, Edit } from "@mui/icons-material";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeamMember: TeamMemberContract | null;
  userId: string;
  primaryButtonAction: (teamMemberData: TeamMemberUpsertContract) => void;
}

export const TeamMemberModal = (props: TeamMemberModalProps): ReactElement => {
  const { isOpen, onClose, selectedTeamMember, userId, primaryButtonAction } = props;
  const { palette } = useTheme();

  // Form state
  const [firstName, setFirstName] = useState<string>(
    selectedTeamMember?.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(
    selectedTeamMember?.lastName || ""
  );
  const [position, setPosition] = useState<string>(
    selectedTeamMember?.position || ""
  );
  const [jiraId, setJiraId] = useState<string>(
    selectedTeamMember?.jiraId || ""
  );
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>(
    selectedTeamMember?.photoUrl || ""
  );
  const [photoDataUrl, setPhotoDataUrl] = useState<string>("");
  const [photoRemoved, setPhotoRemoved] = useState<boolean>(false);
  const [photoError, setPhotoError] = useState<string>("");
  const [isPhotoCropOpen, setIsPhotoCropOpen] = useState<boolean>(false);
  const [photoToCrop, setPhotoToCrop] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form validation errors
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  // If editing, populate form with selected team member data
  useEffect(() => {
    if (selectedTeamMember) {
      setFirstName(selectedTeamMember.firstName || "");
      setLastName(selectedTeamMember.lastName || "");
      setPosition(selectedTeamMember.position || "");
      setJiraId(selectedTeamMember.jiraId || "");
      setPhotoPreviewUrl(selectedTeamMember.photoUrl || "");
      setPhotoDataUrl("");
      setPhotoRemoved(false);
      setPhotoError("");
      setIsPhotoCropOpen(false);
      setPhotoToCrop("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } else {
      // Reset form when opening to add a new team member
      setFirstName("");
      setLastName("");
      setPosition("");
      setJiraId("");
      setPhotoPreviewUrl("");
      setPhotoDataUrl("");
      setPhotoRemoved(false);
      setPhotoError("");
      setIsPhotoCropOpen(false);
      setPhotoToCrop("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
    // Reset validation errors
    setFirstNameError("");
    setLastNameError("");
  }, [selectedTeamMember, isOpen]);

  const getCroppedImageDataUrl = async (
    sourceDataUrl: string,
    pixelCrop: Area
  ): Promise<string> => {
    const image = new Image();
    image.src = sourceDataUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to load image"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to process image");
    }

    context.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  const handlePhotoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Image size must be 2MB or less");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        setPhotoError("Unable to read selected image");
        return;
      }
      setPhotoError("");
      setPhotoToCrop(result);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setIsPhotoCropOpen(true);
    };
    reader.onerror = () => {
      setPhotoError("Unable to read selected image");
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPhotoCrop = async () => {
    if (!photoToCrop || !croppedAreaPixels) {
      setPhotoError("Please crop the image before saving");
      return;
    }

    try {
      const croppedDataUrl = await getCroppedImageDataUrl(
        photoToCrop,
        croppedAreaPixels
      );
      setPhotoDataUrl(croppedDataUrl);
      setPhotoPreviewUrl(croppedDataUrl);
      setPhotoRemoved(false);
      setPhotoError("");
      setIsPhotoCropOpen(false);
    } catch (_error) {
      setPhotoError("Unable to crop image");
    }
  };

  const handleCancelPhotoCrop = () => {
    setIsPhotoCropOpen(false);
    setPhotoToCrop("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreviewUrl("");
    setPhotoDataUrl("");
    setPhotoError("");
    setPhotoRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsPhotoCropOpen(false);
    setPhotoToCrop("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const teamMemberModalData = () => {
    if (selectedTeamMember) {
      return {
        headerName: "Edit Team Member",
        modalIcon: (
          <Edit sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
        ),
        actionButtonLabel: "Save",
      };
    }
    return {
      headerName: "Add Team Member",
      modalIcon: (
        <PersonAdd sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
      ),
      actionButtonLabel: "Create Member",
    };
  };
  const { headerName, modalIcon, actionButtonLabel } = teamMemberModalData();

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate first name (required)
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate last name (required)
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const teamMemberData: TeamMemberUpsertContract = {
        userId,
        firstName,
        lastName,
        position,
        jiraId,
      };
      if (photoDataUrl) {
        teamMemberData.photoDataUrl = photoDataUrl;
        teamMemberData.photoRemoved = false;
      } else if (photoRemoved) {
        teamMemberData.photoRemoved = true;
      }

      primaryButtonAction(teamMemberData);
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        // Only allow close via explicit button clicks, not backdrop clicks
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      disableEscapeKeyDown={false}
    >
      <>
        <ModalWrapper
          headerName={headerName}
          modalIcon={modalIcon}
          onClose={onClose}
          modalHeight={660}
          containerSx={{
            borderRadius: 5,
            border: "1px solid rgba(19, 41, 61, 0.12)",
            boxShadow: "0 28px 60px rgba(19, 41, 61, 0.22)",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,242,232,0.95))",
          }}
          headerSx={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(244,238,227,0.9))",
            borderBottom: "1px solid rgba(19, 41, 61, 0.12)",
            p: 2.25,
          }}
          titleSx={{
            fontFamily: '"Newsreader", serif',
            fontSize: 38,
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1,
          }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              gap: 3.5,
              width: "100%",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
          {/* First Name - Required */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              First Name <span style={{ color: palette.error.main }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              error={!!firstNameError}
              helperText={firstNameError}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                },
              }}
            />
          </Box>

          {/* Last Name - Required */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Last Name <span style={{ color: palette.error.main }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              error={!!lastNameError}
              helperText={lastNameError}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                },
              }}
            />
          </Box>

          {/* Position - Optional */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Position
            </Typography>
            <TextField
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                },
              }}
            />
          </Box>

          {/* Jira ID - Optional */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Jira ID
            </Typography>
            <TextField
              fullWidth
              value={jiraId}
              onChange={(e) => setJiraId(e.target.value)}
              placeholder="Jira Board > Teams > Select team member > Copy Jira ID from URL"
              size="small"
              type="password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                },
              }}
            />
          </Box>

          {/* Photo - Optional */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Profile Photo
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={photoPreviewUrl || undefined}
                alt={`${firstName} ${lastName}`.trim()}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: palette.primary.main,
                }}
              >
                {firstName?.[0] || "?"}
              </Avatar>
              <Box display="flex" gap={1}>
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={handlePhotoSelect}
                />
                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ borderRadius: 999 }}
                >
                  Upload
                </Button>
                {photoPreviewUrl && (
                  <Button
                    variant="text"
                    color="error"
                    onClick={handleRemovePhoto}
                    sx={{ borderRadius: 999 }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            </Box>
            {photoError && (
              <Typography color="error" variant="body2" sx={{ mt: 0.75 }}>
                {photoError}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              JPG, PNG, WEBP or GIF up to 2MB
            </Typography>
          </Box>
          </Box>
          <ModalFooter
            onCancel={onClose}
            onPrimaryClick={handleSubmit}
            isPrimaryDisabled={!firstName || !lastName}
            primaryButtonLabel={actionButtonLabel}
            containerSx={{
              gap: 1.5,
              p: 2.5,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(244,238,227,0.78))",
            }}
            cancelButtonSx={{
              fontSize: 15.5,
              borderRadius: 999,
              px: 2,
            }}
            primaryButtonSx={{
              minWidth: 210,
              minHeight: 46,
              borderRadius: 999,
              fontSize: 16.5,
              fontWeight: 700,
              px: 3,
              letterSpacing: "0.02em",
              "&.Mui-disabled": {
                color: "rgba(19, 41, 61, 0.58)",
                backgroundColor: "rgba(19, 41, 61, 0.16)",
              },
            }}
          />
        </ModalWrapper>
        <Dialog
          open={isPhotoCropOpen}
          onClose={handleCancelPhotoCrop}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Crop Profile Photo</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 320,
                backgroundColor: "#111",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {photoToCrop && (
                <Cropper
                  image={photoToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedPixels) =>
                    setCroppedAreaPixels(croppedPixels)
                  }
                />
              )}
            </Box>
            <Box sx={{ mt: 2, px: 1 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Zoom
              </Typography>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(_, value) => setZoom(value as number)}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCancelPhotoCrop}>Cancel</Button>
            <Button variant="contained" onClick={handleApplyPhotoCrop}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Modal>
  );
};
