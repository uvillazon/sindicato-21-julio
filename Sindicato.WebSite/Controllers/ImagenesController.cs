using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Services.Model;
using Sindicato.Common;
using System.Web.Script.Serialization;
using Sindicato.Model;
using Sindicato.WebSite.Models;
using System.IO;

namespace Sindicato.WebSite.Controllers
{
    public class ImagenesController : Controller
    {
        //
        // GET: /Imagenes/

        private IImagenesServices _servicio;


        public ImagenesController(IImagenesServices servicio)
        {
            _servicio = servicio;
        }

        [HttpGet]
        public ActionResult ObtenerImagenesPaginado(PagingInfo paginacion, FiltrosModel<ImagenesModel> filtros, ImagenesModel imgModel)
        {
            filtros.Entidad = imgModel;
            string callback;
            JavaScriptSerializer js = new JavaScriptSerializer();
            try
            {
                var result = _servicio.ObtenerImagenesPaginado(paginacion, filtros);
                var formatterData = result.Select(cs => new
                {
                    ID_IMG = cs.ID_IMG,
                    ID_TABLA = cs.ID_TABLA,
                    TABLA = cs.TABLA,
                    DESCRIPCION = cs.DESCRIPCION,
                    NOMBRE_IMG = cs.NOMBRE_IMG
                });


                callback = paginacion.callback + "(" + js.Serialize(new { Rows = formatterData, Total = paginacion.total }) + ");";
                return JavaScript(callback);
            }
            catch (Exception e)
            {
                return Json(new { success = false, msg = string.Format("Se produjo un error al intentar obtener los registros de Solicitudes Mantenimiento. Mensaje de excepcion: {0}", e.Message) }, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GuardarImagen(SD_IMAGENES img)
        {

            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            HttpPostedFileBase postedFile = Request.Files["URLIMAGEN"];
            byte[] tempImage;
            JsonResult objResult = null;
            RespuestaSP respuestaSP = new RespuestaSP();
            Imagen imagenes = new Imagen();
            if (postedFile != null)
            {
                if (imagenes.EsArchivoValido(postedFile))
                {

                    var fileName = Path.GetFileName(postedFile.FileName);
                    tempImage = new byte[postedFile.ContentLength];
                    //img.IMAGEN = new byte[postedFile.ContentLength];
                    img.EXTENSION = postedFile.ContentType;
                    img.TAMANO = postedFile.ContentLength;
                    postedFile.InputStream.Read(tempImage, 0, postedFile.ContentLength);
                    img.NOMBRE_IMG = postedFile.FileName;
                    img.IMAGEN = tempImage;
                    img.FECHA_REG = DateTime.Now;
                    respuestaSP = _servicio.GuarbarImagen(img, id_usr);
                    objResult = new JsonResult()
                    {
                        ContentType = "text/html",
                        Data = respuestaSP
                    };
                }
                else
                {
                    objResult = new JsonResult()
                    {
                        ContentType = "text/html",
                        Data = new { success = false, msg = "El Archivo No es Valido" }
                    };
                }


            }
            else
            {
                objResult = new JsonResult()
                {
                    ContentType = "text/html",
                    Data = new { success = false, msg = "Seleccione una Imagen" }
                };
            }

            return objResult;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public FileResult VerImagen(int id, int tamano, string TABLA = null)
        {
            Imagen img = new Imagen();
            SD_IMAGENES Imagen = null;
            if (TABLA != null)
            {
                Imagen = _servicio.BuscarImagen(x => x.ID_TABLA == id && x.TABLA == TABLA);
            }
            else
            {
                Imagen = _servicio.BuscarImagen(x => x.ID_IMG == id);
            }
            if (Imagen != null)
            {
                if (Imagen.EXTENSION != "application/pdf" && Imagen.NOMBRE_IMG.Substring(Imagen.NOMBRE_IMG.Length - 3, 3).ToUpper() != "PDF")
                {
                    using (var input = new MemoryStream(Imagen.IMAGEN))
                    using (var output = new MemoryStream())
                    {
                        img.ResizeImage(input, output, tamano, tamano);
                        return File(output.ToArray(), Imagen.EXTENSION);
                    }
                }
                else
                {
                    return new FilePathResult(HttpContext.Server.MapPath("~/Content/images/no-imagen.jpg"), "image/jpeg");
                }

            }
            else
            {
                return new FilePathResult(HttpContext.Server.MapPath("~/Content/images/no-imagen.jpg"), "image/jpeg");
            }
        }

    }
}
