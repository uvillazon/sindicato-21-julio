using System.Collections.Generic;
using System.Runtime.Serialization;
using System;

namespace Sindicato.Common
{
    [DataContract]
    public class CriteriosBuscar
    {
        [DataMember]
        public string codigobuscar { get; set; }

        [DataMember]
        public string estado { get; set; }

        [DataMember]
        public DateTime fecha_inicial { get; set; }

        [DataMember]
        public DateTime fecha_final { get; set; }

        
   }
}