import React, { Component } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
var slugify = require('slugify')
import * as Http from "../utils/http.helper";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});

export class AddPost extends Component {
  render() {
    const {
      title,
      details,
      slug,
      img,
      tag,
      handleEditorChange,
      mdParser,
      setStates,
      token
    } = this.props;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    const handleSendPost = draft => {
      const {
        title,
        details,
        slug,
        img,
        tag,
        token,
        old_slug,
        modify
      } = this.props;
      //console.log("sended");
      if (modify) {
        Http.post(
          "blog-operations/modify-post",
          {
            old_slug: old_slug,
            title: title,
            slug: slug,
            details: details,
            tag: tag,
            img: img,
            draft: draft
          },
          {
            userToken: token
          }
        ).then(res => {
          if (res.status) {
            Toast.fire({
              icon: "success",
              title: "İşlem başarıyla gerçekleştirildi"
            }).then(()=>{
              window.location.assign("/admin/new-post?modify=true&slug=" + slug);
            })
          } else {
            Toast.fire({
              icon: "error",
              title: "Bir hata oluştu",
              timer: 1000
            }).then(() => {
              Toast.fire({
                icon: "info",
                title: "Sunucudan alınan yanıt konsola yazdırıldı"
              });
            });
          }
        });
      } else {
        Http.post(
          "blog-operations/addPost",
          {
            title: title,
            slug: slug,
            details: details,
            tag: tag,
            img: img,
            draft: draft
          },
          {
            userToken: token
          }
        ).then(res => {
          if (res.status) {
            Toast.fire({
              icon: "success",
              title: "İşlem başarıyla gerçekleştirildi",
              timer: 1000
            }).then(()=>{
              window.location.assign("/admin/new-post?modify=true&slug=" + slug);
            })
          } else {
            Toast.fire({
              icon: "error",
              title: "Bir hata oluştu",
              timer: 1000
            }).then(() => {
              Toast.fire({
                icon: "info",
                title: "Sunucudan alınan yanıt konsola yazdırıldı"
              });
            });
          }
        });
      }
    };
    const setPostDetails = type => {
      switch (type) {
        case "img":
          Swal.fire({
            input: "url",
            inputPlaceholder: "Lütfen resmin URL'sini girin",
            inputValue: img
          }).then(result => {
            if (result.value) {
              setStates(type, result.value);
              Swal.fire({
                title: "Seçilen Resim",
                text: "Bu resmi onaylıyor musunuz?",
                imageUrl: `${result.value}`,
                imageWidth: 400,
                imageAlt: "Post Image",
                showCancelButton: true
              }).then(result => {
                if (result.value) {
                  Toast.fire({
                    icon: "success",
                    title: "Resim başarıyla seçildi"
                  });
                } else {
                  setStates(type, "");
                  Toast.fire({
                    icon: "info",
                    title: "Seçim iptal edildi"
                  });
                }
              });
            }
          });

          break;
        case "slug":
          Swal.fire({
            input: "text",
            inputPlaceholder: "Lütfen slug girin",
            inputValue: slug
          }).then(result => {
            if (result.value) {
              setStates(type, slugify(result.value));
              Swal.fire({
                title: `${slugify(result.value)}`,
                text: "Slug olarak seçilecek onaylıyor musunuz?",
                showCancelButton: true
              }).then(result => {
                if (result.value) {
                  Toast.fire({
                    icon: "success",
                    title: "Slug başarıyla seçildi"
                  });
                } else {
                  setStates(type, "");
                  Toast.fire({
                    icon: "info",
                    title: "Seçim iptal edildi"
                  });
                }
              });
            }
          });
          break;
        case "tag":
          Swal.fire({
            input: "text",
            title: "Tagların aralarına virgül koymayı unutmayın!",
            inputPlaceholder: "Lütfen tagları girin",
            inputValue: tag
          }).then(result => {
            if (result.value) {
              setStates(type, result.value);
              Swal.fire({
                title: `${result.value}`,
                text: "Tag olarak seçilecek onaylıyor musunuz?",
                showCancelButton: true
              }).then(result => {
                if (result.value) {
                  Toast.fire({
                    icon: "success",
                    title: "Tag başarıyla seçildi"
                  });
                } else {
                  setStates(type, "");
                  Toast.fire({
                    icon: "info",
                    title: "Seçim iptal edildi"
                  });
                }
              });
            }
          });
          break;
        case "title":
          Swal.fire({
            input: "text",
            title: "En fazla iki kelime",
            inputPlaceholder: "Lütfen başlık girin",
            inputValue: title
          }).then(result => {
            if (result.value) {
              setStates(type, result.value);
              Swal.fire({
                title: `${result.value}`,
                text: "Başlık olarak seçilecek onaylıyor musunuz?",
                showCancelButton: true
              }).then(result => {
                if (result.value) {
                  Toast.fire({
                    icon: "success",
                    title: "Başlık başarıyla seçildi"
                  });
                } else {
                  setStates(type, "");
                  Toast.fire({
                    icon: "info",
                    title: "Seçim iptal edildi"
                  });
                }
              });
            }
          });
          break;

        default:
          break;
      }
    };
    return (
      <div>
        <div className="text-center create-new-post">
          <h3 className="create-new-post-title-text">Yeni Gönderi Oluştur</h3>
          <hr />
          <div className="btn-group">
            <button
              className={
                slug == ""
                  ? "btn btn-info post-settings-buttons"
                  : "btn btn-success post-settings-buttons"
              }
              type="button"
              onClick={e => {
                setPostDetails("slug");
              }}
            >
              Slug Belirle
            </button>
            <button
              className={
                title == ""
                  ? "btn btn-info post-settings-buttons"
                  : "btn btn-success post-settings-buttons"
              }
              type="button"
              onClick={e => {
                setPostDetails("title");
              }}
            >
              Başlık Belirle
            </button>
            <button
              className={
                img == ""
                  ? "btn btn-info post-settings-buttons"
                  : "btn btn-success post-settings-buttons"
              }
              type="button"
              onClick={e => {
                setPostDetails("img");
              }}
            >
              Resim URL Belirle
            </button>
            <button
              className={
                tag == ""
                  ? "btn btn-info post-settings-buttons"
                  : "btn btn-success post-settings-buttons"
              }
              type="button"
              onClick={e => {
                setPostDetails("tag");
              }}
            >
              Tagları Belirle
            </button>
          </div>
          <div style={{ margin: "10px" }}>
            <MdEditor
              value={details}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
              style={{ height: "500px", textAlign: "initial" }}
            />
          </div>
          <div className="btn-group" style={{ margin: "10px" }}>
            <button
              className="btn btn-secondary post-settings-buttons"
              id="draft"
              type="button"
              onClick={() => {
                handleSendPost(true);
              }}
            >
              Taslağa Kaydet
            </button>
            <button
              className="btn btn-primary post-settings-buttons"
              id="submit"
              type="button"
              onClick={() => {
                handleSendPost(false);
              }}
            >
              Yayınla
            </button>
            <button
              className="btn btn-danger post-settings-buttons"
              id="cancel"
              type="button"
              onClick={() => {
                window.location.assign("/admin/new-post");
              }}
            >
              İptal Et
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPost;
