using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;
using Sindicato.Services.Model;

namespace Sindicato.Services
{
    public class CierresServices : BaseService, ICierresServices
    {

        public IEnumerable<SD_ANTECEDENTES> ObtenerAntecedentesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_ANTECEDENTES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_ANTECEDENTESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        public RespuestaSP GuardarAntecedente(SD_ANTECEDENTES ant, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_ANTECEDENTESManager(uow);
                var crear = manager.GuardarAntecedente(ant, login);
                int id;
                bool esNumero = int.TryParse(crear, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = crear;
                }

            });
            return result;
        }

        public RespuestaSP EliminarAntecedente(int ID_ANTECEDENTE)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_ANTECEDENTESManager(uow);
                var ant = manager.BuscarTodos(x => x.ID_ANTECEDENTE == ID_ANTECEDENTE).FirstOrDefault();
                if (ant != null)
                {
                    manager.Delete(ant);
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
            //throw new NotImplementedException();
        }



        public SD_ANTECEDENTES ObtenerAntecedentePorCriterio(Expression<Func<SD_ANTECEDENTES, bool>> criterio)
        {
            SD_ANTECEDENTES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_ANTECEDENTESManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
            //throw new NotImplementedException();
        }



        #region Listas , Crear Editar  Documentos

        public IEnumerable<SD_DOCUMENTACIONES> ObtenerDocumentacionesPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_DOCUMENTACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DOCUMENTACIONESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        public RespuestaSP GuardarDocumentacion(SD_DOCUMENTACIONES doc, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DOCUMENTACIONESManager(uow);
                var crear = manager.GuardarDocumentacion(doc, login);
                int id;
                bool esNumero = int.TryParse(crear, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = crear;
                }

            });
            return result;
        }
        public SD_DOCUMENTACIONES ObtenerDocumentoPorCriterio(Expression<Func<SD_DOCUMENTACIONES, bool>> criterio)
        {
            SD_DOCUMENTACIONES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DOCUMENTACIONESManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }
        public RespuestaSP EliminarDocumentaciones(int ID_DOCUMENTACION)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DOCUMENTACIONESManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_DOCUMENTACION == ID_DOCUMENTACION).FirstOrDefault();
                if (ant != null)
                {
                    manager.Delete(ant);
                    var imagenes = context.SD_IMAGENES.Where(x => x.ID_TABLA == ant.ID_DOCUMENTACION && x.TABLA == "SD_DOCUMENTACIONES");
                    foreach (var item in imagenes)
                    {
                        context.SD_IMAGENES.DeleteObject(item);
                    }
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }
        #endregion

        #region Desempenos
        public IEnumerable<SD_SOCIO_DESEMPENOS> ObtenerDesempenosPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_SOCIO_DESEMPENOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_DESEMPENOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarDesempeno(SD_SOCIO_DESEMPENOS des, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_DESEMPENOSManager(uow);
                var crear = manager.GuardarDesempeno(des, login);
                int id;
                bool esNumero = int.TryParse(crear, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = crear;
                }

            });
            return result;
        }

        public RespuestaSP EliminarDesempeno(int ID_DESEMPENO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_DESEMPENOSManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_DESEMPENO == ID_DESEMPENO).FirstOrDefault();
                if (ant != null)
                {
                    manager.Delete(ant);
                    var imagenes = context.SD_IMAGENES.Where(x => x.ID_TABLA == ant.ID_DESEMPENO && x.TABLA == "SD_SOCIO_DESEMPENOS");
                    foreach (var item in imagenes)
                    {
                        context.SD_IMAGENES.DeleteObject(item);
                    }
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }

        public SD_SOCIO_DESEMPENOS ObtenerDesempenoPorCriterio(Expression<Func<SD_SOCIO_DESEMPENOS, bool>> criterio)
        {
            SD_SOCIO_DESEMPENOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_DESEMPENOSManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }
        #endregion

        public IEnumerable<SD_CIERRES> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_CIERRES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarCierre(SD_CIERRES cierre, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRESManager(uow);
                var crear = manager.GuardarCierre(cierre, login);
                int id;
                bool esNumero = int.TryParse(crear, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = crear;
                }

            });
            return result;
        }

        public SD_CIERRES ObtenerUltimoRegistroCierre()
        {
            SD_CIERRES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRESManager(uow);
                result = manager.BuscarTodos().OrderByDescending(x => x.ID_CIERRE).FirstOrDefault();
            });
            return result;
        }


        public List<PeriodoSocioModel> ObtenerCierrePeriodoSocio(int ID_CIERRE)
        {
            List<PeriodoSocioModel> result = new List<PeriodoSocioModel>();
            ExecuteManager(uow =>
            {
                var managerCierre = new SD_CIERRESManager(uow);
                var managerIngresos = new SD_VENTA_HOJASManager(uow);
                var managerSocios = new SD_SOCIOSManager(uow);
                var socios = managerSocios.BuscarTodos(x => x.ESTADO == "ACTIVO");
                var cierre = managerCierre.BuscarTodos(x => x.ID_CIERRE == ID_CIERRE).FirstOrDefault();
                foreach (var socio in socios)
                {
                    decimal ingresosHojas = 0;
                    foreach (var mov in socio.SD_SOCIO_MOVILES.Where(x => x.ESTADO == "ACTIVO"))
                    {
                        //var totales = mov.SD_VENTA_HOJAS.GroupBy(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
                        ingresosHojas = ingresosHojas + (decimal)mov.SD_VENTA_HOJAS.Where(y => y.FECHA_VENTA >= cierre.FECHA_INI && y.FECHA_VENTA <= cierre.FECHA_FIN).Sum(x => x.TOTAL);
                    }
                    //var moviles 
                    PeriodoSocioModel item = new PeriodoSocioModel()
                    {
                        ID_PERIODO = cierre.ID_CIERRE,
                        ID_SOCIO = socio.ID_SOCIO,
                        PERIODO= cierre.CODIGO,
                        SOCIO = string.Format("{0} {1} {2}", socio.NOMBRE, socio.APELLIDO_PATERNO, socio.APELLIDO_MATERNO),
                        INGRESOS_HOJAS = ingresosHojas,
                        OTROS_INGRESOS = 0,
                        OBLIGACIONES_INSTITUCION = socio.SD_OBLIGACIONES_SOCIO.Sum(x => x.IMPORTE),
                        OTRAS_OBLIGACIONES = socio.SD_DESCUENTOS_SOCIO.Where(x=>x.SD_DESCUENTOS.ID_CIERRE == ID_CIERRE).Sum(y=>y.IMPORTE)
                        //INGRESOS_HOJAS = socio.SD_SOCIO_MOVILES.Where(x=>x.id
                    };
                    result.Add(item);
                }
                foreach (var item in result)
                {
                    var total = (item.INGRESOS_HOJAS + item.OTROS_INGRESOS) - (item.OBLIGACIONES_INSTITUCION - item.OTRAS_OBLIGACIONES);
                    if (total > 0)
                    {
                        item.AHORRO = total;
                        item.DEUDA = 0;
                    }
                    else {
                        item.AHORRO = 0;
                        item.DEUDA = total * -1;

                    }
                }

            });
            return result;
            //throw new NotImplementedException();
        }
    }
}
