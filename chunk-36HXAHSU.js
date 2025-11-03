function a(r){let t=r.get("newPassword"),s=r.get("repeatNewPassword"),e={passwordShouldMatch:{mismatch:!0}};return t?.value===s?.value?null:(s?.setErrors(e),e)}export{a};
