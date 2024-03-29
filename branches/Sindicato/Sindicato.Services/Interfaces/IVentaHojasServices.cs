﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Expressions;

namespace Sindicato.Services.Interfaces
{
    public interface IVentaHojasServices
    {
        IEnumerable<SD_VENTA_HOJAS> ObtenerVentasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        IEnumerable<SD_DETALLE_HOJAS> ObtenerDetallesPaginado(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        IEnumerable<HojasModel> ObtenerFechasDisponibles(DateTime FECHA_VENTA, int ID_SOCIO_MOVIL);
        RespuestaSP GuardarVentaHoja(SD_VENTA_HOJAS venta, string detalles, string login);
        RespuestaSP AnularVentaHoja(int ID_VENTA, string login);


        //SD_USUARIOS
    }
}
