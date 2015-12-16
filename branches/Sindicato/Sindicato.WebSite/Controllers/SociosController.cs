using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.WebSite.Models;
using System.Web.Script.Serialization;
using Sindicato.Common;
using Sindicato.Services.Model;
using Sindicato.Model;

namespace Sindicato.WebSite.Controllers
{
    public class SociosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private ISociosServices _serSoc;
        private IImagenesServices _serImg;
        public SociosController(ISociosServices serSoc, IImagenesServices serImg)
        {
            _serSoc = serSoc;
            _serImg = serImg;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serSoc.ObtenerSociosPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                ID_MOVIL = x.ID_MOVIL,
                ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL,
                DESCRIPCION = x.DESCRIPCION,
                NRO_MOVIL = x.SD_MOVILES.NRO_MOVIL,
                FECHA_INGRESO = x.FECHA_ALTA,
                TIPO_MOVIL = x.TIPO_MOVIL,
                NRO_SOCIO = x.SD_SOCIOS.NRO_SOCIO,
                NOMBRE = x.SD_SOCIOS.NOMBRE,
                APELLIDO_MATERNO = x.SD_SOCIOS.APELLIDO_MATERNO,
                APELLIDO_PATERNO = x.SD_SOCIOS.APELLIDO_PATERNO,
                //NOMBRE_SOCIO = string.Format("{0} {1} {2}",x.SD_SOCIOS.NOMBRE,x.SD_SOCIOS.APELLIDO_PATERNO,x.SD_SOCIOS.APELLIDO_MATERNO),
                NRO_LICENCIA = x.SD_SOCIOS.NRO_LICENCIA,
                CATEGORIA_LIC = x.SD_SOCIOS.CATEGORIA_LIC,
                LICENCIA = string.Format("{0} {1}", x.SD_SOCIOS.NRO_LICENCIA, x.SD_SOCIOS.CATEGORIA_LIC),
                CI = x.SD_SOCIOS.CI,
                EXPEDIDO = x.SD_SOCIOS.EXPEDIDO,
                CARNET = string.Format("{0} {1}", x.SD_SOCIOS.CI, x.SD_SOCIOS.EXPEDIDO),
                FECHA_NAC = x.SD_SOCIOS.FECHA_NAC,
                DOMICILIO = x.SD_SOCIOS.DOMICILIO,
                OBSERVACION = x.SD_SOCIOS.OBSERVACION,
                ESTADO_CIVIL = x.SD_SOCIOS.ESTADO_CIVIL,
                NOMBRE_SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                FECHA_BAJA = x.SD_SOCIOS.FECHA_BAJA,
                TELEFONO = x.SD_SOCIOS.TELEFONO,
                CELULAR = x.SD_SOCIOS.CELULAR,
                ESTADO = x.ESTADO,
                ID_IMG = _serImg.ConImagen(x.ID_SOCIO, "SD_SOCIOS"),
                SALDO = x.SD_SOCIOS.SALDO,
                DEUDA = x.SD_SOCIOS.DEUDA,
                PRECIO_HOJA = x.SD_SOC_MOV_OBLIG.Count() > 0 ? x.SD_SOC_MOV_OBLIG.Sum(y => y.IMPORTE) : 0
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        public ActionResult ObtenerSoloSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serSoc.ObtenerSoloSociosPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                SOCIO = string.Format("{0} {1} {2}", x.NOMBRE, x.APELLIDO_PATERNO, x.APELLIDO_MATERNO),
                NRO_SOCIO = x.NRO_SOCIO,
                NOMBRE = x.NOMBRE,
                APELLIDO_MATERNO = x.APELLIDO_MATERNO,
                APELLIDO_PATERNO = x.APELLIDO_PATERNO,
                NRO_LICENCIA = x.NRO_LICENCIA,
                CATEGORIA_LIC = x.CATEGORIA_LIC,
                CI = x.CI,
                EXPEDIDO = x.EXPEDIDO,
                FECHA_NAC = x.FECHA_NAC,
                DOMICILIO = x.DOMICILIO,
                OBSERVACION = x.OBSERVACION,
                ESTADO_CIVIL = x.ESTADO_CIVIL,

                FECHA_BAJA = x.FECHA_BAJA,
                TELEFONO = x.TELEFONO,
                CELULAR = x.CELULAR,
                ESTADO = x.ESTADO,
                ID_IMG = _serImg.ConImagen(x.ID_SOCIO, "SD_SOCIOS"),
                SALDO = x.SALDO,
                DEUDA = x.DEUDA
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerSocioMovil(int ID_SOCIO_MOVIL)
        {
            var socios = _serSoc.ObtenerSocioMovilPorCriterio(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL);
            var data = new
            {
                ID_SOCIO_MOVIL = socios.ID_SOCIO_MOVIL,
                ID_SOCIO = socios.ID_SOCIO,
                ID_MOVIL = socios.ID_MOVIL,
                FECHA_ALTA = String.Format("{0:dd/MM/yyyy}", socios.FECHA_ALTA),
                DESCRIPCION = socios.DESCRIPCION,
                OBSERVACION = socios.OBSERVACION,
                TIPO_MOVIL = socios.TIPO_MOVIL,
                NRO_MOVIL = socios.SD_MOVILES.NRO_MOVIL,
                NOMBRE = string.Format("{0} {1} {2}", socios.SD_SOCIOS.NOMBRE, socios.SD_SOCIOS.APELLIDO_PATERNO, socios.SD_SOCIOS.APELLIDO_MATERNO)
            };
            return Json(new { data = data, success = true });
        }

        [HttpGet]
        public JavaScriptResult ObtenerAutosSocios(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serSoc.ObtenerAutosSocioPaginado(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_AUTO = x.SD_AUTOS.ID_AUTO,
                ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL,
                MARCA = x.SD_AUTOS.MARCA,
                MODELO = x.SD_AUTOS.MODELO,
                TIPO = x.TIPO,
                COLOR = x.SD_AUTOS.COLOR,
                DESCRIPCION = x.SD_AUTOS.DESCRIPCION,
                PLACA = x.SD_AUTOS.PLACA,
                MOTOR = x.SD_AUTOS.MOTOR,
                FECHA_ALTA = x.FECHA_ALTA,

                ID_IMG = _serImg.ConImagen(x.ID_AUTO, "SD_AUTOS")
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        #region GuardarSocio Editar Eliminar
        [HttpPost]
        public JsonResult GuardarSocio(SD_SOCIOS socio)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarSocio(socio, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult GuardarSocioMovil(SD_SOCIO_MOVILES socio)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarSocioMovil(socio, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult GuardarNuevoSocioMovilPrimario(SD_SOCIO_MOVILES socio)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarNuevoSocioMovilPrimario(socio, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult GuardarAuto(SD_AUTOS auto)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarAutos(auto, id_usr);
            return Json(respuestaSP);
        }
        #endregion
        #region Automoviles Socio Movil Autos
        [HttpPost]
        public JsonResult GuardarSocioMovilAutoPrincipal(SD_SOCIO_MOVIL_AUTOS soc, int DIAS)
        {

            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarSocioMovilAuto(soc, DIAS, login);
            return Json(respuestaSP);
        }

        #endregion
        #region Obligaciones Socio
        [HttpGet]
        public JavaScriptResult ObtenerObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serSoc.ObtenerObligaciones(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_OBLIGACION = x.ID_OBLIGACION,
                ID_SOCIO = x.ID_SOCIO,
                IMPORTE = x.IMPORTE,
                LOGIN = x.LOGIN,
                OBLIGACION = x.OBLIGACION
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpGet]
        public JavaScriptResult ObtenerKardexObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serSoc.ObtenerKardexObligaciones(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_OBLIGACION = x.ID_OBLIGACION,
                FECHA = x.FECHA,
                ID_KARDEX = x.ID_KARDEX,
                LOGIN = x.LOGIN,
                MOTIVO = x.MOTIVO,
                IMPORTE_ANTERIOR = x.IMPORTE_ANTERIOR,
                IMPORTE_NUEVO = x.IMPORTE_NUEVO
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarObligacion(SD_KARDEX_OBLIGACION kardex, int ID_SOCIO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarObligacion(kardex, ID_SOCIO, login);
            return Json(respuestaSP);
        }
        //GuardarObligacion
        #endregion

        #region Ingresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerIngresosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serSoc.ObtenerIngresosPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_INGRESO = x.ID_INGRESO,
                ID_SOCIO = x.ID_SOCIO,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                INGRESO = x.INGRESO,
                LOGIN = x.LOGIN,
                NRO_RECIBO = x.NRO_RECIBO,
                OBSERVACION = x.OBSERVACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerIngresoPorId(int ID_INGRESO)
        {
            var x = _serSoc.ObtenerIngresosPorCriterio(y => y.ID_INGRESO == ID_INGRESO);
            var data = new
            {
                ID_INGRESO = x.ID_INGRESO,
                ID_SOCIO = x.ID_SOCIO,
                NRO_RECIBO = x.NRO_RECIBO,
                INGRESO = x.INGRESO,
                LOGIN = x.LOGIN,
                OBSERVACION = x.OBSERVACION,
                FECHA = String.Format("{0:dd/MM/yyyy}", x.FECHA),
                FECHA_REG = String.Format("{0:dd/MM/yyyy}", x.FECHA_REG),
            };
            return Json(new { data = data, success = true });
        }
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarIngreso(SD_INGRESOS_SOCIO ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarIngresoSocio(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarIngreso(int ID_INGRESO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.EliminarIngresoSocio(ID_INGRESO);
            return Json(respuestaSP);
        }
        #endregion

        #region Kardex Socio Ahorros

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serSoc.ObtenerKardexSociosPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                DETALLE = x.DETALLE,
                ID_SOCIO = x.ID_SOCIO,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                INGRESO = x.INGRESO,
                LOGIN = x.LOGIN,
                EGRESO = x.EGRESO,
                SALDO = x.SALDO,
                ID_KARDEX = x.ID_KARDEX,
                ID_OPERACION = x.ID_OPERACION,
                OPERACION = x.OPERACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        #endregion

        #region Retiros de Socios Listar Obtener Crear Eliminar
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerRetirosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serSoc.ObtenerRetirosPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_RETIRO = x.ID_RETIRO,
                ID_SOCIO = x.ID_SOCIO,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                RETIRO = x.RETIRO,
                LOGIN = x.LOGIN,
                NOMBRE_SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                NRO_RECIBO = x.NRO_RECIBO,
                OBSERVACION = x.OBSERVACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerRetiroPorId(int ID_RETIRO)
        {
            var x = _serSoc.ObtenerRetiroPorCriterio(y => y.ID_RETIRO == ID_RETIRO);
            var data = new
            {
                ID_RETIRO = x.ID_RETIRO,
                ID_SOCIO = x.ID_SOCIO,
                RETIRO = x.RETIRO,
                LOGIN = x.LOGIN,
                NRO_RECIBO = x.NRO_RECIBO,
                OBSERVACION = x.OBSERVACION,
                FECHA = String.Format("{0:dd/MM/yyyy}", x.FECHA),
                FECHA_REG = String.Format("{0:dd/MM/yyyy}", x.FECHA_REG),
            };
            return Json(new { data = data, success = true });
        }
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarRetiroSocio(SD_RETIRO_SOCIO ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarRetiroSocio(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarRetiroSocio(int ID_RETIRO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.EliminarRetiroSocio(ID_RETIRO);
            return Json(respuestaSP);
        }
        #endregion

        #region obligaciones socio movil por hoja

        [HttpPost]
        public JsonResult GuardarSocMovHoja(SD_SOC_MOV_OBLIG socio)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarSocioMovilObligacion(socio, login);
            return Json(respuestaSP);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetalleConfigHojas(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serSoc.ObtenerConfigHojasPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_OBLIGACION = x.ID_OBLIGACION,
                ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL,
                ID_SOC_MOV_OBLIG = x.ID_SOC_MOV_OBLIG,
                OBLIGACION = x.SD_OBLIGACIONES_HOJA.OBLIGACION,
                CAJA = x.SD_OBLIGACIONES_HOJA.SD_CAJAS.NOMBRE,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                LOGIN = x.LOGIN,

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerObligacionesHojasPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serSoc.ObtenerObligacionesHojasPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_OBLIGACION = x.ID_OBLIGACION,
                ID_CAJA = x.ID_CAJA,
                ID_LINEA = x.ID_LINEA,
                OBLIGACION = x.OBLIGACION,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA_REG = x.FECHA_REG,
                IMPORTE_DEFECTO = x.IMPORTE_DEFECTO,
                LOGIN = x.LOGIN,

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        //ObtenerObligacionesHojasPaginados

        #endregion
    }
}
