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
    public interface IPrestamosServices
    {
        IEnumerable<SD_PRESTAMOS_POR_SOCIOS> ObtenerPrestamosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);
        IEnumerable<SD_TIPOS_PRESTAMOS> ObtenerTiposPrestamosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);
        IEnumerable<SD_PLAN_DE_PAGO> ObtenerPlanDePagosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);
        IEnumerable<SD_PAGO_DE_PRESTAMOS> ObtenerPagosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);

        RespuestaSP GuardarTipoPrestamo(SD_TIPOS_PRESTAMOS tipo, string login);
        RespuestaSP EliminarTipoPrestamo(int ID_TIPO);


        RespuestaSP GuardarPrestamo(SD_PRESTAMOS_POR_SOCIOS prestamo, string login);
        RespuestaSP EliminarPrestamo(int ID_PRESTAMO);

        RespuestaSP GenerarPlanDePagos(int ID_PRESTAMO, string login);

        RespuestaSP GuardarPagoPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login);
        RespuestaSP GuardarPagoTotalPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login);

        RespuestaSP EliminarPagoPrestamo(int ID_PAGO,string login);

        RespuestaSP GuardarMora(SD_PRESTAMOS_MORA mora, string login);
        RespuestaSP EliminarMora(int ID_MORA);

        IEnumerable<SD_PRESTAMOS_MORA> ObtenerMorasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);

        RespuestaSP ObtenerImporteDeuda(string TIPO, DateTime FECHA, int ID_PRESTAMO, string login);

        List<PlanPagosModel> generarPlanDeCuotasFrances(double capital, double tasaAnual, int plazoMeses, DateTime fechaPago, int decimales);

        RespuestaSP ObtenerPlanDePagoACancelar(int ID_PRESTAMO);
        RespuestaSP ObtenerTotalACancelar(int ID_PRESTAMO);

        RespuestaSP GuardarRefinanciamientoPrestamo(SD_PAGO_DE_PRESTAMOS pago, SD_PRESTAMOS_POR_SOCIOS pres, string login);




    }
}
