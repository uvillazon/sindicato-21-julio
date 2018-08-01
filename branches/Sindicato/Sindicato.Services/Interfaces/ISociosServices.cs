using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Expressions;

namespace Sindicato.Services.Interfaces
{
    public interface ISociosServices
    {
        IEnumerable<SD_SOCIO_MOVILES> ObtenerSociosMoviles(Expression<Func<SD_SOCIO_MOVILES, bool>> criterio = null);
        IEnumerable<SD_SOCIOS> ObtenerSoloSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_SOCIO_MOVILES> ObtenerSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        IEnumerable<SD_SOCIO_MOVIL_AUTOS> ObtenerAutosSocioPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        SD_SOCIOS ObtenerSocioPorCriterio(Expression<Func<SD_SOCIOS, bool>> criterio);
        SD_SOCIO_MOVILES ObtenerSocioMovilPorCriterio(Expression<Func<SD_SOCIO_MOVILES, bool>> criterio);

        RespuestaSP GuardarSocio(SD_SOCIOS socio, int ID_USR);
        RespuestaSP GuardarSocioMovil(SD_SOCIO_MOVILES socio, int ID_USR);
        RespuestaSP BajaSocioMovil(SD_SOCIO_MOVILES movil, int ID_USR);
        RespuestaSP GuardarNuevoSocioMovilPrimario(SD_SOCIO_MOVILES socio, int ID_USR);
        RespuestaSP GuardarAutos(SD_AUTOS auto, int ID_USR);
        //SD_USUARIOS
        IEnumerable<SD_OBLIGACIONES_SOCIO> ObtenerObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_KARDEX_OBLIGACION> ObtenerKardexObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        RespuestaSP GuardarObligacion(SD_KARDEX_OBLIGACION kardex, int ID_SOCIO, string login);

        RespuestaSP GuardarSocioMovilAuto(SD_SOCIO_MOVIL_AUTOS soc, int DIAS, string login);

        IEnumerable<SD_KARDEX_SOCIO> ObtenerKardexSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_KARDEX_SOCIO_MOVIL> ObtenerKardexSociosMovilPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        IEnumerable<SD_INGRESOS_SOCIO> ObtenerIngresosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        SD_INGRESOS_SOCIO ObtenerIngresosPorCriterio(Expression<Func<SD_INGRESOS_SOCIO, bool>> criterio);
        RespuestaSP GuardarIngresoSocio(SD_INGRESOS_SOCIO ingreso, string login);
        RespuestaSP EliminarIngresoSocio(int ID_INGRESO);

        RespuestaSP GuardarSocioMovilObligacion(SD_SOC_MOV_OBLIG socio, string LOGIN);
        IEnumerable<SD_SOC_MOV_OBLIG> ObtenerConfigHojasPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_OBLIGACIONES_HOJA> ObtenerObligacionesHojasPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        RespuestaSP EliminarSocio(int ID_SOCIO, string LOGIN);

        #region Retiros
        IEnumerable<SD_RETIRO_SOCIO_MOVIL> ObtenerRetirosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        SD_RETIRO_SOCIO_MOVIL ObtenerRetiroPorCriterio(Expression<Func<SD_RETIRO_SOCIO_MOVIL, bool>> criterio);
        RespuestaSP GuardarRetiroSocio(SD_RETIRO_SOCIO_MOVIL ingreso, string login);
        RespuestaSP EliminarRetiroSocio(int ID_RETIRO);
        #endregion

        #region Transferecnias Hojas
        IEnumerable<SD_TRANSFERENCIAS_HOJAS> ObtenerTransferenciasHojasPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        RespuestaSP GuardarTransferenciaHojas(SD_TRANSFERENCIAS_HOJAS data, string login);
        RespuestaSP AnularTransferenciaHoja(int ID_TRANSF);
        RespuestaSP ObtenerResumenDeHojas(int ID_SOCIO_MOVIL);
        RespuestaSP VerificarHojasDeSocio(int ID_SOCIO_MOVIL);
        #endregion
    }
}
